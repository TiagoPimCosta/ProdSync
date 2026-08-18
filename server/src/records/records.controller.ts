import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
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
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@ApiTags('Records')
@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new record' })
  @ApiResponse({
    status: 201,
    description:
      'Record submitted for machine {machineId} by the authenticated user.',
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
  async create(
    @Body() createRecordDto: CreateRecordRequestDto,
    @CurrentUser('id') userId: string,
  ) {
    try {
      return await this.recordsService.create({
        machineId: createRecordDto.machineId,
        userId,
      });
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
    description: 'Filter by user (UUID)',
    type: String,
  })
  @ApiQuery({
    name: 'machine',
    required: false,
    description: 'Filter by machine (UUID)',
    type: String,
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
    @Query('user', new ParseUUIDPipe({ optional: true })) user?: string,
    @Query('machine', new ParseUUIDPipe({ optional: true })) machine?: string,
    @Query('startPeriod') startPeriod?: Date,
    @Query('endPeriod') endPeriod?: Date,
  ): Promise<
    | PaginatedResource<Partial<Record> & { timeSincePrevious: number | null }>
    | ErrorResponse
  > {
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
  findAllFromUser(@Param('userId', ParseUUIDPipe) userId: string) {
    try {
      return this.recordsService.findAllFromUser(userId);
    } catch (error) {
      throw error;
    }
  }

  @Get('/machine/:machineId')
  findAllFromMachine(@Param('machineId', ParseUUIDPipe) machineId: string) {
    try {
      return this.recordsService.findAllFromMachine(machineId);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @Roles(Role.Admin)
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
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      return this.recordsService.delete(id);
    } catch (error) {
      throw error;
    }
  }

  @Get('avgActionTime')
  async getAvgActionTime(
    @Query('machineId', ParseUUIDPipe) machineId: string,
    @Query('userId', new ParseUUIDPipe({ optional: true })) userId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.recordsService.getAvgActionTime(
      machineId,
      userId,
      startDate,
      endDate,
    );
  }

  @Get('kpis')
  @ApiOperation({ summary: 'Get dashboard KPIs' })
  @ApiResponse({
    status: 200,
    description: 'KPIs successfully retrieved',
  })
  async getKpis() {
    return this.recordsService.getKpis();
  }

  @Get('recordHistory')
  async getRecordsHistory(@Query('userId', ParseUUIDPipe) userId: string) {
    return this.recordsService.getRecordsHistory(userId);
  }

  @Get('hourlyStats')
  async getHourlyStats(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('userId', new ParseUUIDPipe({ optional: true })) userId?: string,
    @Query('lineId', new ParseUUIDPipe({ optional: true })) lineId?: string,
    @Query('machineId', new ParseUUIDPipe({ optional: true }))
    machineId?: string,
  ) {
    return this.recordsService.getHourlyRecordCounts(
      startDate,
      endDate,
      userId,
      lineId,
      machineId,
    );
  }

  @Get('dailyStats')
  async getDaylyStats(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('userId', new ParseUUIDPipe({ optional: true })) userId?: string,
    @Query('lineId', new ParseUUIDPipe({ optional: true })) lineId?: string,
    @Query('machineId', new ParseUUIDPipe({ optional: true }))
    machineId?: string,
  ) {
    return this.recordsService.getDailyRecordCounts(
      startDate,
      endDate,
      userId,
      lineId,
      machineId,
    );
  }
}
