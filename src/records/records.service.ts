import {
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

    const user = await this.usersService.findOneById(userId);
    if (!user) throw new NotFoundException('User not Found');

    const machine = await this.machinesService.findOneById(machineId);
    if (!machine) throw new NotFoundException('Machine not Found');

    const newRecord = this.recordRepository.create({
      ...createRecordDetails,
      user: { id: user.id },
      machine: { id: createRecordDetails.machineId },
      createdAt: new Date(),
    });
    this.recordRepository.save(newRecord);

    return {
      statusCode: 200,
      message: `Record has been added.`,
    };
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

  async findAllFromUser(userId: number) {
    const user = await this.usersService.findOneById(userId);
    if (!user) throw new NotFoundException(`User with ID ${userId} not found.`);
    return this.recordRepository.findBy({ user: { id: userId } });
  }

  async findAllFromMachine(machineId: number) {
    const machine = await this.machinesService.findOneById(machineId);
    if (!machine)
      throw new NotFoundException(`Machine with ID ${machineId} not found.`);
    return this.recordRepository.findBy({ machine: { id: machineId } });
  }

  async delete(id: number): Promise<SuccessResponse | ErrorResponse> {
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
}
