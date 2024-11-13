import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/typeorm/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserParams, UpdateUserParams } from './params';
import { ErrorResponse } from 'src/types/ErrorResponse';
import { checkFieldUniqueness } from 'src/utils/checkFieldUniqueness';

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

  async findAll() {
    try {
      return this.userRepository.find();
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

      await this.userRepository.update({ id }, { isActive: false });
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
