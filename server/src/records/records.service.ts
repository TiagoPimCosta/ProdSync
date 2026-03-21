import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { MachinesService } from 'src/machines/machines.service';
import { CreateRecordParams } from 'src/helpers/params/records.params';
import { Record } from 'src/helpers/typeorm/entities/record.entity';
import { Pagination } from 'src/helpers/decorators/pagination.params.decorator';
import * as dayjs from 'dayjs';
import { PaginatedResource } from 'src/helpers/dtos/paginatedResource.dto';
import { ErrorResponse } from 'src/types/ErrorResponse';
import { SuccessResponse } from 'src/types/SuccessResponse';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record) private recordRepository: Repository<Record>,
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
  ): Promise<PaginatedResource<Record> | ErrorResponse> {
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

      queryBuilder.skip(offset).take(limit);

      const [records, total] = await queryBuilder.getManyAndCount();

      return {
        items: records,
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
}
