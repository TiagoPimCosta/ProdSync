import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { MachinesService } from 'src/machines/machines.service';
import { Record } from 'src/helpers/typeorm/entities/record.entity';
import { User } from 'src/helpers/typeorm/entities/user.entity';
import { Machine } from 'src/helpers/typeorm/entities/machine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Record, User, Machine])],
  controllers: [RecordsController],
  providers: [RecordsService, UsersService, MachinesService],
})
export class RecordsModule {}
