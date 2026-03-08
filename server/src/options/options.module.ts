import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/helpers/typeorm/entities/user.entity';
import { Machine } from 'src/helpers/typeorm/entities/machine.entity';
import { Line } from 'src/helpers/typeorm/entities/line.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Machine, Line])],
  controllers: [OptionsController],
  providers: [OptionsService],
})
export class OptionsModule {}
