import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { Record } from '../typeorm/entities/record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/typeorm/entities/user.entity';
import { Machine } from 'src/typeorm/entities/machine.entity';
import { MachinesService } from 'src/machines/machines.service';

@Module({
  imports: [TypeOrmModule.forFeature([Record, User, Machine])],
  controllers: [RecordsController],
  providers: [RecordsService, UsersService, MachinesService],
})
export class RecordsModule {}
