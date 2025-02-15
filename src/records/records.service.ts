import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { MachinesService } from 'src/machines/machines.service';
import { CreateRecordParams } from 'src/helpers/params/records.params';
import { Record } from 'src/helpers/typeorm/entities/record.entity';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record) private recordRepository: Repository<Record>,
    private readonly usersService: UsersService,
    private readonly machinesService: MachinesService,
  ) {}

  async create(createRecordDetails: CreateRecordParams) {
    const user = await this.usersService.findOneById(
      createRecordDetails.userId,
    );

    if (!user) {
      throw new NotFoundException('User not Found');
    }

    const machine = await this.machinesService.findOne(
      createRecordDetails.machineId,
    );

    if (!machine) {
      throw new NotFoundException('Machine not Found');
    }

    const newRecord = this.recordRepository.create({
      ...createRecordDetails,
      user,
      machine,
      createdAt: new Date(),
    });
    return this.recordRepository.save(newRecord);
  }

  findAll() {
    return this.recordRepository.find({
      relations: ['user'],
    });
  }

  async findAllFromUser(userId: number) {
    const user = await this.usersService.findOneById(userId);
    if (user) return this.recordRepository.findBy({ user });
    return [];
  }
}
