import { Controller, Get } from '@nestjs/common';
import { OptionsService } from './options.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Options')
@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Get('users')
  getUsers() {
    return this.optionsService.getUsers();
  }

  @Get('machines')
  getMachines() {
    return this.optionsService.getMachines();
  }

  @Get('lines')
  getLines() {
    return this.optionsService.getLines();
  }
}
