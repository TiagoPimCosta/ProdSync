import { Module } from '@nestjs/common';
import { LinesService } from './lines.service';
import { LinesController } from './lines.controller';
import { Line } from 'src/helpers/typeorm/entities/line.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Line])],
  controllers: [LinesController],
  providers: [LinesService],
})
export class LinesModule {}
