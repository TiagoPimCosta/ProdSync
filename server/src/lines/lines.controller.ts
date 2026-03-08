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
import { LinesService } from './lines.service';
import {
  CreateLineRequestDto,
  UpdateLineRequestDto,
} from 'src/helpers/dtos/lines.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/types/SuccessResponse';
import { ErrorResponse } from 'src/types/ErrorResponse';
import { Line } from 'src/helpers/typeorm/entities/line.entity';
import {
  Pagination,
  PaginationParams,
} from 'src/helpers/decorators/pagination.params.decorator';
import { PaginatedResource } from 'src/helpers/dtos/paginatedResource.dto';

@ApiTags('Lines')
@Controller('lines')
export class LinesController {
  constructor(private readonly linesService: LinesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new line' })
  @ApiResponse({
    status: 201,
    description: 'Line {lineName} has been created',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ErrorResponse,
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
  async create(
    @Body() createLineDto: CreateLineRequestDto,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      return await this.linesService.create(createLineDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all lines' })
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
    name: 'status',
    required: false,
    description: 'Filter by status',
    type: String,
    enum: ['0', '1'],
  })
  @ApiResponse({
    status: 200,
    description: 'Lines successfully retrieved',
    type: [Line],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ErrorResponse,
  })
  findAll(
    @PaginationParams() paginationParams: Pagination,
    @Query('name') name?: string,
    @Query('status') status?: string,
  ): Promise<PaginatedResource<Partial<Line>> | ErrorResponse> {
    try {
      return this.linesService.findAll(paginationParams, name, status);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a line by ID' })
  @ApiResponse({
    status: 200,
    description: 'Line successfully retrieved',
    type: Line,
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.linesService.findOneById(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a line by ID' })
  @ApiResponse({
    status: 200,
    description: 'Line successfully updated',
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
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLineDto: UpdateLineRequestDto,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      return this.linesService.update(id, updateLineDto);
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
      return this.linesService.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
