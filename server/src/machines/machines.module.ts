import { Module } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { MachinesController } from './machines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Machine } from 'src/helpers/typeorm/entities/machine.entity';
import { User } from 'src/helpers/typeorm/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Machine, User])],
  controllers: [MachinesController],
  providers: [MachinesService],
  exports: [MachinesService],
})
export class MachinesModule {}
