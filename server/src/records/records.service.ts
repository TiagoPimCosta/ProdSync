import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { MachinesService } from 'src/machines/machines.service';
import { CreateRecordParams } from 'src/helpers/params/records.params';
import { Record } from 'src/helpers/typeorm/entities/record.entity';
import { User } from 'src/helpers/typeorm/entities/user.entity';
import { Machine } from 'src/helpers/typeorm/entities/machine.entity';
import { Pagination } from 'src/helpers/decorators/pagination.params.decorator';
import * as dayjs from 'dayjs';
import { PaginatedResource } from 'src/helpers/dtos/paginatedResource.dto';
import { ErrorResponse } from 'src/types/ErrorResponse';
import { SuccessResponse } from 'src/types/SuccessResponse';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record) private recordRepository: Repository<Record>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Machine) private machineRepository: Repository<Machine>,
    private readonly usersService: UsersService,
    private readonly machinesService: MachinesService,
  ) {}

  async create(createRecordDetails: CreateRecordParams) {
    const { userId, machineId } = createRecordDetails;

    try {
      const user = await this.usersService.findOneById(userId);
      if (!user) throw new NotFoundException('Utilizador não encontrado');

      const machine = await this.machinesService.findOneById(machineId);
      if (!machine) throw new NotFoundException('Máquina não encontrada');

      const isMachineAssociated = user.machine.some(
        (userMachine) => userMachine.id === machineId,
      );
      if (!isMachineAssociated) {
        throw new NotFoundException('Máquina não associada a este utilizador');
      }

      const newRecord = this.recordRepository.create({
        ...createRecordDetails,
        user: { id: userId },
        machine: { id: machineId },
        createdAt: new Date(),
      });

      await this.recordRepository.save(newRecord);

      return {
        statusCode: 200,
        message: 'Ação registada com sucesso',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error('Unexpected error in create record:', error); // optional logging

      throw new InternalServerErrorException('Erro interno no servidor');
    }
  }

  async findAll(
    { page, limit, size, offset }: Pagination,
    user?: number,
    machine?: number,
    startPeriod?: Date,
    endPeriod?: Date,
  ): Promise<PaginatedResource<Record & { timeSincePrevious: number | null }> | ErrorResponse> {
    try {
      const queryBuilder = this.recordRepository.createQueryBuilder('record');
      queryBuilder.leftJoinAndSelect('record.user', 'user');
      queryBuilder.leftJoinAndSelect('record.machine', 'machine');

      if (user) queryBuilder.andWhere('record.user = :user', { user });
      if (machine)
        queryBuilder.andWhere('record.machine = :machine', { machine });

      if (endPeriod < startPeriod)
        [startPeriod, endPeriod] = [endPeriod, startPeriod];

      if (startPeriod)
        queryBuilder.andWhere('record.createdAt >= :startPeriod', {
          startPeriod: dayjs(startPeriod).startOf('day').format(),
        });

      if (endPeriod)
        queryBuilder.andWhere('record.createdAt <= :endPeriod', {
          endPeriod: dayjs(endPeriod).endOf('day').format(),
        });

      queryBuilder.orderBy('record.createdAt', 'DESC').skip(offset).take(limit);

      const [records, total] = await queryBuilder.getManyAndCount();

      if (records.length === 0) {
        return { items: [], totalItems: total, size, page };
      }

      const ids = records.map((r) => r.id);
      const diffs = await this.recordRepository
        .createQueryBuilder('r1')
        .select('r1.id', 'id')
        .addSelect(
          `TIMESTAMPDIFF(SECOND, (
            SELECT r2.createdAt FROM records r2
            WHERE r2.userId = r1.userId
              AND r2.createdAt < r1.createdAt
              AND DATE(r2.createdAt) = DATE(r1.createdAt)
            ORDER BY r2.createdAt DESC LIMIT 1
          ), r1.createdAt)`,
          'timeSincePrevious',
        )
        .where('r1.id IN (:...ids)', { ids })
        .getRawMany<{ id: string; timeSincePrevious: number | null }>();

      const diffMap = new Map(diffs.map((d) => [d.id, d.timeSincePrevious]));

      return {
        items: records.map((r) => ({
          ...r,
          timeSincePrevious: diffMap.get(r.id) ?? null,
        })),
        totalItems: total,
        size,
        page,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while fetching the records.',
        error,
      );
    }
  }

  async findAllFromUser(userId: string) {
    const user = await this.usersService.findOneById(userId);
    if (!user) throw new NotFoundException(`User with ID ${userId} not found.`);
    return this.recordRepository.findBy({ user: { id: userId } });
  }

  async findAllFromMachine(machineId: string) {
    const machine = await this.machinesService.findOneById(machineId);
    if (!machine)
      throw new NotFoundException(`Machine with ID ${machineId} not found.`);
    return this.recordRepository.findBy({ machine: { id: machineId } });
  }

  async delete(id: string): Promise<SuccessResponse | ErrorResponse> {
    try {
      const record = await this.recordRepository.findOneBy({ id });
      if (!record)
        throw new NotFoundException(`Record with ID ${id} not found.`);

      await this.recordRepository.delete(id);
      return {
        statusCode: 200,
        message: `Record with number ${record.id} has been deleted.`,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while deleting the record.',
      );
    }
  }

  async getRecordsHistory(userId: number) {
    const records = await this.recordRepository
      .createQueryBuilder('record')
      .leftJoinAndSelect('record.machine', 'machine')
      .leftJoinAndSelect('machine.line', 'line')
      .where('record.userId = :userId', { userId })
      .orderBy('record.createdAt', 'DESC')
      .limit(10)
      .getMany();

    return records;
  }

  async getHourlyRecordCounts(
    startDate: string,
    endDate: string,
    userId?: number,
    lineId?: number,
    machineId?: number,
  ) {
    const query = this.recordRepository
      .createQueryBuilder('record')
      .leftJoin('record.machine', 'machine')
      .leftJoin('machine.line', 'line')
      .select("DATE_FORMAT(record.createdAt, '%Y-%m-%d %H:00')", 'hour')
      .addSelect('COUNT(*)', 'count')
      .where(
        'record.createdAt >= :startDate AND record.createdAt <= :endDate',
        {
          startDate,
          endDate,
        },
      );

    if (userId) {
      query.andWhere('record.userId = :userId', { userId });
    }

    if (machineId) {
      query.andWhere('record.machine = :machineId', { machineId });
    }

    if (lineId) {
      query.andWhere('line.id = :lineId', { lineId });
    }

    const raw = await query.groupBy('hour').orderBy('hour').getRawMany();

    const countsByHour = Object.fromEntries(
      raw.map((row) => [row.hour, parseInt(row.count)]),
    );

    const filledHours: { hour: string; count: number }[] = [];

    let current = dayjs(startDate).startOf('hour');
    const end = dayjs(endDate).startOf('hour');

    while (current.isBefore(end.add(1, 'hour'))) {
      const formatted = current.format('YYYY-MM-DD HH:00');
      filledHours.push({
        hour: formatted,
        count: countsByHour[formatted] || 0,
      });
      current = current.add(1, 'hour');
    }

    return filledHours;
  }

  async getDailyRecordCounts(
    startDate: string,
    endDate: string,
    userId?: number,
    lineId?: number,
    machineId?: number,
  ) {
    const query = this.recordRepository
      .createQueryBuilder('record')
      .leftJoin('record.machine', 'machine')
      .leftJoin('machine.line', 'line')
      .select("DATE_FORMAT(record.createdAt, '%Y-%m-%d')", 'day')
      .addSelect('COUNT(*)', 'count')
      .where(
        'record.createdAt >= :startDate AND record.createdAt <= :endDate',
        {
          startDate,
          endDate,
        },
      );

    if (userId) {
      query.andWhere('record.userId = :userId', { userId });
    }

    if (machineId) {
      query.andWhere('record.machine = :machineId', { machineId });
    }

    if (lineId) {
      query.andWhere('line.id = :lineId', { lineId });
    }

    const raw = await query.groupBy('day').orderBy('day').getRawMany();

    const countsByDay = Object.fromEntries(
      raw.map((row) => [row.day, parseInt(row.count)]),
    );

    const filledDays: { day: string; count: number }[] = [];

    let current = dayjs(startDate).startOf('day');
    const end = dayjs(endDate).startOf('day');

    while (current.isBefore(end.add(1, 'day'))) {
      const formatted = current.format('YYYY-MM-DD');
      filledDays.push({
        day: formatted,
        count: countsByDay[formatted] || 0,
      });
      current = current.add(1, 'day');
    }

    return filledDays;
  }

  async getAvgActionTime(
    machineId: number,
    userId?: number,
    startDate?: string,
    endDate?: string,
  ): Promise<{ avgSeconds: number | null }> {
    try {
      const qb = this.recordRepository
        .createQueryBuilder('r1')
        .select(
          `AVG(TIMESTAMPDIFF(SECOND, (
            SELECT r2.createdAt FROM records r2
            WHERE r2.userId = r1.userId
              AND r2.machineId = r1.machineId
              AND r2.createdAt < r1.createdAt
              AND DATE(r2.createdAt) = DATE(r1.createdAt)
            ORDER BY r2.createdAt DESC LIMIT 1
          ), r1.createdAt))`,
          'avgSeconds',
        )
        .where('r1.machine = :machineId', { machineId });

      if (userId) qb.andWhere('r1.user = :userId', { userId });
      if (startDate) qb.andWhere('r1.createdAt >= :startDate', { startDate });
      if (endDate) qb.andWhere('r1.createdAt <= :endDate', { endDate });

      const result = await qb.getRawOne<{ avgSeconds: string | null }>();
      return {
        avgSeconds:
          result?.avgSeconds != null ? parseFloat(result.avgSeconds) : null,
      };
    } catch (error) {
      console.error('Error in getAvgActionTime:', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching average action time.',
      );
    }
  }

  async getKpis() {
    const todayStart = dayjs().startOf('day').toDate();
    const todayEnd = dayjs().endOf('day').toDate();
    const yesterdayStart = dayjs().subtract(1, 'day').startOf('day').toDate();
    const yesterdayEnd = dayjs().subtract(1, 'day').endOf('day').toDate();
    const monthStart = dayjs().startOf('month').toDate();
    const monthEnd = dayjs().endOf('day').toDate();
    const lastMonthStart = dayjs().subtract(1, 'month').startOf('month').toDate();
    const lastMonthEnd = dayjs().subtract(1, 'month').endOf('month').toDate();

    const [
      todayRecords,
      yesterdayRecords,
      monthRecords,
      lastMonthRecords,
      activeUsers,
      activeMachines,
    ] = await Promise.all([
      this.recordRepository.count({
        where: { createdAt: Between(todayStart, todayEnd) },
      }),
      this.recordRepository.count({
        where: { createdAt: Between(yesterdayStart, yesterdayEnd) },
      }),
      this.recordRepository.count({
        where: { createdAt: Between(monthStart, monthEnd) },
      }),
      this.recordRepository.count({
        where: { createdAt: Between(lastMonthStart, lastMonthEnd) },
      }),
      this.userRepository.count({ where: { status: true } }),
      this.machineRepository.count({ where: { status: true } }),
    ]);

    return {
      todayRecords,
      yesterdayRecords,
      monthRecords,
      lastMonthRecords,
      activeUsers,
      activeMachines,
    };
  }
}
