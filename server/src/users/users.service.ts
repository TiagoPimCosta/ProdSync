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
    const newUser = this.userRepository.create({ ...createUserDetails });
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOneById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  findOneByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  update(id: number, updateUserDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return this.userRepository.update({ id }, { isActive: !user.isActive });
  }
}
