import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/typeorm/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorResponse } from 'src/types/ErrorResponse';
import { checkFieldUniqueness } from 'src/utils/checkFieldUniqueness';
import { CreateUserParams, UpdateUserParams } from 'src/params/users.params';
import { Pagination } from 'src/helpers/decorators/pagination.params.decorator';
import { PaginatedResource } from 'src/dtos/paginatedResource.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(
    createUserDetails: CreateUserParams,
  ): Promise<void | ErrorResponse> {
    try {
      await checkFieldUniqueness(
        this.userRepository,
        'idNumber',
        createUserDetails.idNumber,
        'Number is already registered',
      );

      await checkFieldUniqueness(
        this.userRepository,
        'username',
        createUserDetails.username,
        'Username is already registered',
      );
      await checkFieldUniqueness(
        this.userRepository,
        'cc',
        createUserDetails.cc,
        'CC is already registered',
      );
      await checkFieldUniqueness(
        this.userRepository,
        'nif',
        createUserDetails.nif,
        'Nif is already registered',
      );

      const newUser = this.userRepository.create({
        ...createUserDetails,
        admission: createUserDetails.admission ?? new Date(),
      });

      await this.userRepository.save(newUser);
    } catch (error) {
      if (error instanceof ConflictException) throw error;

      throw new InternalServerErrorException(
        'An error occurred while creating the user.',
      );
    }
  }

  async findAll(
    { page, limit, size, offset }: Pagination,
    name?: string,
    role?: string,
    status?: string,
    startAdmission?: Date,
    endAdmission?: Date,
  ): Promise<PaginatedResource<User> | ErrorResponse> {
    try {
      const queryBuilder = this.userRepository.createQueryBuilder('user');

      if (name)
        queryBuilder.andWhere('user.name LIKE :name', { name: `%${name}%` });

      if (role) queryBuilder.andWhere('user.role = :role', { role });

      if (status) queryBuilder.andWhere('user.status = :status', { status });

      if (endAdmission < startAdmission)
        [startAdmission, endAdmission] = [endAdmission, startAdmission];

      if (startAdmission)
        queryBuilder.andWhere('user.admission >= :startAdmission', {
          startAdmission: dayjs(startAdmission).startOf('day').format(),
        });

      if (endAdmission)
        queryBuilder.andWhere('user.admission <= :endAdmission', {
          endAdmission: dayjs(endAdmission).endOf('day').format(),
        });

      queryBuilder.skip(offset).take(limit);

      const [users, total] = await queryBuilder.getManyAndCount();

      return {
        items: users,
        totalItems: total,
        size,
        page,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while fetching the users.',
        error,
      );
    }
  }
  async findOneById(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) throw new NotFoundException(`User with ID ${id} not found.`);

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException(
        'An error occurred while fetching the user.',
      );
    }
  }

  async findOneByUsername(username: string) {
    try {
      const user = this.userRepository.findOneBy({ username });
      if (!user)
        throw new NotFoundException(
          `User with Username ${username} not found.`,
        );

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while fetching the user.',
      );
    }
  }

  async update(
    id: number,
    updateUserDetails: UpdateUserParams,
  ): Promise<void | ErrorResponse> {
    try {
      if (updateUserDetails.idNumber)
        await checkFieldUniqueness(
          this.userRepository,
          'idNumber',
          updateUserDetails.idNumber,
          'Number is already registered',
        );

      if (updateUserDetails.username)
        await checkFieldUniqueness(
          this.userRepository,
          'username',
          updateUserDetails.username,
          'Username is already registered',
        );

      if (updateUserDetails.cc)
        await checkFieldUniqueness(
          this.userRepository,
          'cc',
          updateUserDetails.cc,
          'CC is already registered',
        );

      if (updateUserDetails.nif)
        await checkFieldUniqueness(
          this.userRepository,
          'nif',
          updateUserDetails.nif,
          'Nif is already registered',
        );

      const user = await this.userRepository.findOneBy({ id });
      if (!user) throw new NotFoundException(`User with ID ${id} not found.`);

      await this.userRepository.update({ id }, { ...updateUserDetails });
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      )
        throw error;

      throw new InternalServerErrorException(
        'An error occurred while updating the user.',
      );
    }
  }

  async delete(id: number): Promise<void | ErrorResponse> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) throw new NotFoundException(`User with ID ${id} not found.`);

      await this.userRepository.update({ id }, { status: !user.status });
      return {
        statusCode: 200,
        message: `User with number ${user.idNumber} has been ${!user.status ? 'activated' : 'deactivated'}.`,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while deleting the user.',
      );
    }
  }
}
