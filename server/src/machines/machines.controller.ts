import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { MachinesService } from './machines.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateMachineRequestDto,
  UpdateMachineRequestDto,
  UpdateMachineUserDto,
} from 'src/helpers/dtos/machines.dto';
import { SuccessResponse } from 'src/types/SuccessResponse';
import { ErrorResponse } from 'src/types/ErrorResponse';
import { Machine } from 'src/helpers/typeorm/entities/machine.entity';
import {
  Pagination,
  PaginationParams,
} from 'src/helpers/decorators/pagination.params.decorator';
import { PaginatedResource } from 'src/helpers/dtos/paginatedResource.dto';

@ApiTags('Machines')
@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new machine' })
  @ApiResponse({
    status: 201,
    description: 'Machine {machineName} has been created',
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
    status: 500,
    description: 'Internal Server Error',
    type: ErrorResponse,
  })
  async create(
    @Body() createMachineDto: CreateMachineRequestDto,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      return this.machinesService.create(createMachineDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all machines' })
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
    name: 'name',
    required: false,
    description: 'Filter by name',
    type: String,
  })
  @ApiQuery({
    name: 'line',
    required: false,
    description: 'Filter by line',
    type: String,
  })
  @ApiQuery({
    name: 'user',
    required: false,
    description: 'Filter by user',
    type: String,
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter by status',
    type: String,
    enum: ['0', '1'],
  })
  @ApiResponse({
    status: 200,
    description: 'Machines successfully retrieved',
    type: [Machine],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ErrorResponse,
  })
  findAll(
    @PaginationParams() paginationParams: Pagination,
    @Query('name') name?: string,
    @Query('line') line?: string,
    @Query('user') user?: string,
    @Query('status') status?: string,
  ): Promise<PaginatedResource<Partial<Machine>> | ErrorResponse> {
    try {
      return this.machinesService.findAll(
        paginationParams,
        name,
        line,
        user,
        status,
      );
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Machine by ID' })
  @ApiResponse({
    status: 200,
    description: 'Machine successfully retrieved',
    type: Machine,
  })
  @ApiResponse({
    status: 404,
    description: 'Machine not found',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ErrorResponse,
  })
  findOne(@Param('id') id: string): Promise<Machine | ErrorResponse> {
    try {
      return this.machinesService.findOneById(id);
    } catch (error) {
      throw error;
    }
  }

  @Get('/user/:userId')
  @ApiOperation({ summary: 'Get all machines from a user' })
  @ApiResponse({
    status: 200,
    description: 'Machines successfully retrieved',
    type: [Machine],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ErrorResponse,
  })
  findAllFromAUser(
    @Param('userId') userId: string,
  ): Promise<Machine[] | ErrorResponse> {
    try {
      return this.machinesService.findAllByUserId(userId);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a machine by ID' })
  @ApiResponse({
    status: 200,
    description: 'Machine successfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'Machine not found',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ErrorResponse,
  })
  async update(
    @Param('id') id: string,
    @Body() updateMachineDto: UpdateMachineRequestDto,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      return this.machinesService.update(id, updateMachineDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a machine by ID' })
  @ApiResponse({
    status: 200,
    description: 'Machine successfully deleted',
    type: SuccessResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Machine not found',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ErrorResponse,
  })
  async delete(
    @Param('id') id: string,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      return this.machinesService.delete(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id/user')
  @ApiOperation({ summary: 'Update machine user' })
  @ApiResponse({
    status: 200,
    description: 'Machine user successfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'Machine or User not found',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ErrorResponse,
  })
  async updateUser(@Param('id') id: string, @Body() dto: UpdateMachineUserDto) {
    return this.machinesService.updateUser(id, dto.userId);
  }
}
