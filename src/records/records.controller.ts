import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Records')
@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  create(@Body() createRecordDto: CreateRecordDto) {
    return this.recordsService.create(createRecordDto);
  }

  @Get()
  findAll() {
    return this.recordsService.findAll();
  }

  @Get(':userId')
  findAllFromUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.recordsService.findAllFromUser(userId);
  }
}
