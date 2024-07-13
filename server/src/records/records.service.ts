import { Injectable, NotFoundException } from '@nestjs/common';
import { Record } from '../typeorm/entities/record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateRecordParams } from './params';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record) private recordRepository: Repository<Record>,
    private readonly usersService: UsersService,
  ) {}

  async create(createRecordDetails: CreateRecordParams) {
    const user = await this.usersService.findOneById(
      createRecordDetails.userId,
    );

    if (!user) {
      throw new NotFoundException('User not Found');
    }

    const newRecord = this.recordRepository.create({
      ...createRecordDetails,
      user,
      createdAt: new Date(),
    });
    return this.recordRepository.save(newRecord);
  }

  findAll() {
    return this.recordRepository.find();
  }

  async findAllFromUser(userId: number) {
    const user = await this.usersService.findOneById(userId);
    if (user) return this.recordRepository.findBy({ user });
    return [];
  }
}
