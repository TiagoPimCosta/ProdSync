import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from '../typeorm/entities/record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record) private recordRepository: Repository<Record>,
    private readonly usersService: UsersService,
  ) {}

  create(createRecordDetails: CreateRecordDto) {
    const newrecord = this.recordRepository.create({
      ...createRecordDetails,
      createdAt: new Date(),
    });
    return this.recordRepository.save(newrecord);
  }

  findAll() {
    return this.recordRepository.find();
  }

  async findAllFromUser(userId: number) {
    const user = await this.usersService.findOne(userId);
    if (user) return this.recordRepository.findBy({ user });
    return [];
  }
}
