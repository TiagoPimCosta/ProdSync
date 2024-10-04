import { Injectable } from '@nestjs/common';
import { User } from 'src/typeorm/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserParams, UpdateUserParams } from './params';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserDetails: CreateUserParams) {
    try {
      //Verify if the idNumber/nif/phone/email/cc/username are not registered
      //If they are, this should return an error
      const newUser = this.userRepository.create({ ...createUserDetails });
      return this.userRepository.save(newUser);
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    try {
      return this.userRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  findOneById(id: number) {
    try {
      const user = this.userRepository.findOneBy({ id });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  findOneByUsername(username: string) {
    try {
      const user = this.userRepository.findOneBy({ username });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateUserDetails: UpdateUserParams) {
    try {
      const user = this.userRepository.findOneBy({ id });
      if (!user) {
        throw new Error('User not found');
      }
      return this.userRepository.update({ id }, { ...updateUserDetails });
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new Error('User not found');
      }
      return this.userRepository.update({ id }, { isActive: !user.isActive });
    } catch (error) {
      console.log(error);
    }
  }
}
