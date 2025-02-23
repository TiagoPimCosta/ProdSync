import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/helpers/decorators/pagination.params.decorator';
import { PaginatedResource } from 'src/helpers/dtos/paginatedResource.dto';
import {
  CreateLineParams,
  UpdateLineParams,
} from 'src/helpers/params/lines.params';
import { Line } from 'src/helpers/typeorm/entities/line.entity';
import { ErrorResponse } from 'src/types/ErrorResponse';
import { SuccessResponse } from 'src/types/SuccessResponse';
import { Repository } from 'typeorm';

@Injectable()
export class LinesService {
  constructor(
    @InjectRepository(Line) private lineRepository: Repository<Line>,
  ) {}

  async create(
    createLineDetails: CreateLineParams,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      const newLine = this.lineRepository.create(createLineDetails);
      await this.lineRepository.save(newLine);
      return {
        statusCode: 200,
        message: `Line ${newLine.name} has been created.`,
      };
    } catch (error) {
      if (error instanceof ConflictException) throw error;

      throw new InternalServerErrorException('Error creating line');
    }
  }

  async findAll(
    { page, limit, size, offset }: Pagination,
    name?: string,
    status?: string,
  ): Promise<PaginatedResource<Line> | ErrorResponse> {
    try {
      const queryBuilder = this.lineRepository.createQueryBuilder('line');

      if (name)
        queryBuilder.andWhere('line.name LIKE :name', {
          name: `%${name}%`,
        });

      if (status) queryBuilder.andWhere('line.status = :status', { status });

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
        'An error occurred while fetching the lines.',
        error,
      );
    }
  }

  async findOneById(id: number) {
    try {
      const line = await this.lineRepository.findOne({
        where: { id },
        relations: ['machine'],
      });
      if (!line) throw new NotFoundException(`Line with ID ${id} not found.`);

      return line;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException(
        'An error occurred while fetching the line.',
      );
    }
  }

  async update(
    id: number,
    updateLineDetails: UpdateLineParams,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      const line = await this.lineRepository.findOneBy({ id });
      if (!line) throw new NotFoundException(`Line with ID ${id} not found.`);

      await this.lineRepository.update({ id }, { ...updateLineDetails });
      return {
        statusCode: 200,
        message: `Line with number ${line.id} has been updated.`,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      )
        throw error;

      throw new InternalServerErrorException(
        'An error occurred while updating the line.',
        error,
      );
    }
  }

  async delete(id: number): Promise<SuccessResponse | ErrorResponse> {
    try {
      const line = await this.lineRepository.findOneBy({ id });
      if (!line) throw new NotFoundException(`Line with ID ${id} not found.`);

      await this.lineRepository.update({ id }, { status: !line.status });
      return {
        statusCode: 200,
        message: `Line with number ${line.id} has been ${!line.status ? 'activated' : 'deactivated'}.`,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while deleting the line.',
      );
    }
  }
}
