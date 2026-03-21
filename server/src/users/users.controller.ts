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
import { UsersService } from './users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponse } from 'src/types/ErrorResponse';
import {
  CreateUserRequestDto,
  UpdateUserRequestDto,
} from 'src/helpers/dtos/users.dto';
import {
  Pagination,
  PaginationParams,
} from 'src/helpers/decorators/pagination.params.decorator';
import { PaginatedResource } from 'src/helpers/dtos/paginatedResource.dto';
import { SuccessResponse } from 'src/types/SuccessResponse';
import { User } from 'src/helpers/typeorm/entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User {userName} has been created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
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
    @Body() createUserDto: CreateUserRequestDto,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
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
    name: 'role',
    required: false,
    description: 'Filter by role',
    type: String,
    enum: ['admin', 'user'],
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter by status',
    type: String,
    enum: ['0', '1'],
  })
  @ApiQuery({
    name: 'startAdmission',
    required: false,
    description: 'Filter by start admission date',
    type: Date,
  })
  @ApiQuery({
    name: 'endAdmission',
    required: false,
    description: 'Filter by end admission date',
    type: Date,
  })
  @ApiResponse({
    status: 200,
    description: 'Users successfully retrieved',
    type: [User],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ErrorResponse,
  })
  findAll(
    @PaginationParams() paginationParams: Pagination,
    @Query('name') name?: string,
    @Query('role') role?: string,
    @Query('status') status?: string,
    @Query('startAdmission') startAdmission?: Date,
    @Query('endAdmission') endAdmission?: Date,
  ): Promise<PaginatedResource<Partial<User>> | ErrorResponse> {
    try {
      return this.usersService.findAll(
        paginationParams,
        name,
        role,
        status,
        startAdmission,
        endAdmission,
      );
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User successfully retrieved',
    type: User,
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
  findOne(@Param('id') id: string) {
    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User successfully updated',
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
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserRequestDto,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      return this.usersService.update(id, updateUserDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User successfully deleted',
    type: SuccessResponse,
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
  async delete(
    @Param('id') id: string,
  ): Promise<SuccessResponse | ErrorResponse> {
    try {
      return await this.usersService.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
