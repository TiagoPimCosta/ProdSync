import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
  Delete,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRecordRequestDto } from 'src/helpers/dtos/records.dto';
import { ErrorResponse } from 'src/types/ErrorResponse';
import { Record } from 'src/helpers/typeorm/entities/record.entity';
import {
  Pagination,
  PaginationParams,
} from 'src/helpers/decorators/pagination.params.decorator';
import { PaginatedResource } from 'src/helpers/dtos/paginatedResource.dto';
import { SuccessResponse } from 'src/types/SuccessResponse';

@ApiTags('Records')
@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new record' })
  @ApiResponse({
    status: 201,
    description: 'Record submitted for machine {machineId} by user {userId}.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Machine not found',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ErrorResponse,
  })
  async create(@Body() createRecordDto: CreateRecordRequestDto) {
    try {
      return await this.recordsService.create(createRecordDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all records' })
  @ApiQuery({
    name: 'page',
    description: 'Filter by page',
    type: Number,
  })
  @ApiQuery({
    name: 'size',
    description: 'Filter by size',
    type: Number,
  })
  @ApiQuery({
    name: 'user',
    required: false,
    description: 'Filter by user',
    type: Number,
  })
  @ApiQuery({
    name: 'machine',
    required: false,
    description: 'Filter by machine',
    type: Number,
  })
  @ApiQuery({
    name: 'startPeriod',
    required: false,
    description: 'Filter by start period',
    type: Date,
  })
  @ApiQuery({
    name: 'endPeriod',
    required: false,
    description: 'Filter by end period',
    type: Date,
  })
  @ApiResponse({
    status: 200,
    description: 'Records successfully retrieved',
    type: [Record],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ErrorResponse,
  })
  findAll(
    @PaginationParams() paginationParams: Pagination,
    @Query('user') user?: number,
    @Query('machine') machine?: number,
    @Query('startPeriod') startPeriod?: Date,
    @Query('endPeriod') endPeriod?: Date,
  ): Promise<PaginatedResource<Partial<Record>> | ErrorResponse> {
    try {
      return this.recordsService.findAll(
        paginationParams,
        user,
        machine,
        startPeriod,
        endPeriod,
      );
    } catch (error) {
      throw error;
    }
  }

  @Get('/user/:userId')
  findAllFromUser(@Param('userId', ParseIntPipe) userId: number) {
    try {
      return this.recordsService.findAllFromUser(userId);
    } catch (error) {
      throw error;
    }
  }

  @Get('/machine/:machineId')
  findAllFromMachine(@Param('machineId', ParseIntPipe) machineId: number) {
    try {
      return this.recordsService.findAllFromMachine(machineId);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a line by ID' })
  @ApiResponse({
    status: 200,
    description: 'Line successfully deleted',
    type: SuccessResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Line not found',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ErrorResponse,
  })
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      return this.recordsService.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
