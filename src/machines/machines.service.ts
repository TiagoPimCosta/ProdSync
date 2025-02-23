import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateMachineParams,
  UpdateMachineParams,
} from 'src/helpers/params/machines.params';
import { Machine } from 'src/helpers/typeorm/entities/machine.entity';
import { SuccessResponse } from 'src/types/SuccessResponse';
import { ErrorResponse } from 'src/types/ErrorResponse';
import { PaginatedResource } from 'src/helpers/dtos/paginatedResource.dto';
import { Pagination } from 'src/helpers/decorators/pagination.params.decorator';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine) private machineRepository: Repository<Machine>,
  ) {}

  async create(
    createMachineDto: CreateMachineParams,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      const newMachine = this.machineRepository.create(createMachineDto);
      await this.machineRepository.save(newMachine);
      return {
        statusCode: 200,
        message: `Machine ${newMachine.name} has been created.`,
      };
    } catch (error) {
      if (error instanceof ConflictException) throw error;

      throw new InternalServerErrorException('Error creating machine');
    }
  }

  async findAll(
    { page, limit, size, offset }: Pagination,
    name?: string,
    line?: string,
    user?: string,
  ): Promise<PaginatedResource<Machine> | ErrorResponse> {
    try {
      const queryBuilder = this.machineRepository
        .createQueryBuilder('machine')
        .leftJoinAndSelect('machine.line', 'line')
        .leftJoinAndSelect('machine.user', 'user');

      if (name)
        queryBuilder.andWhere('machine.name LIKE :name', {
          name: `%${name}%`,
        });
      if (line) queryBuilder.andWhere('machine.line = :line', { line });
      if (user) queryBuilder.andWhere('machine.user = :user', { user });

      queryBuilder.skip(offset).take(limit);

      const [lines, total] = await queryBuilder.getManyAndCount();

      return {
        items: lines,
        totalItems: total,
        size,
        page,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while fetching the machines.',
        error,
      );
    }
  }

  async findOneById(id: number): Promise<Machine | ErrorResponse> {
    try {
      const queryBuilder = this.machineRepository
        .createQueryBuilder('machine')
        .leftJoinAndSelect('machine.line', 'line')
        .leftJoinAndSelect('machine.user', 'user');

      if (id) queryBuilder.andWhere('machine.id = :id', { id });

      return queryBuilder.getOne();
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while fetching the machine.',
        error,
      );
    }
  }

  async update(
    id: number,
    updateMachineDetails: UpdateMachineParams,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      const machine = await this.machineRepository.findOneBy({ id });
      if (!machine)
        throw new NotFoundException(`Machine with ID ${id} not found.`);

      await this.machineRepository.update({ id }, { ...updateMachineDetails });
      return {
        statusCode: 200,
        message: `Machine with number ${machine.id} has been updated.`,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      )
        throw error;

      throw new InternalServerErrorException(
        'An error occurred while updating the machine.',
        error,
      );
    }
  }

  async delete(id: number): Promise<SuccessResponse | ErrorResponse> {
    try {
      const machine = await this.machineRepository.findOneBy({ id });
      if (!machine)
        throw new NotFoundException(`Machine with ID ${id} not found.`);

      await this.machineRepository.update({ id }, { status: !machine.status });
      return {
        statusCode: 200,
        message: `Machine with number ${machine.id} has been ${!machine.status ? 'activated' : 'deactivated'}.`,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while deleting the machine.',
      );
    }
  }
}
