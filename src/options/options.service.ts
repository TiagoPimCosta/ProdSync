import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Line } from 'src/helpers/typeorm/entities/line.entity';
import { Machine } from 'src/helpers/typeorm/entities/machine.entity';
import { User } from 'src/helpers/typeorm/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Machine) private machineRepository: Repository<Machine>,
    @InjectRepository(Line) private lineRepository: Repository<Line>,
  ) {}

  async getUsers(): Promise<{ value: string; label: string }[]> {
    const users = await this.userRepository.find({
      select: ['id', 'name'],
    });

    return users.map((user) => ({
      value: user.id.toString(),
      label: user.name,
    }));
  }

  async getMachines(): Promise<{ value: string; label: string }[]> {
    const machines = await this.machineRepository.find({
      select: ['id', 'name'],
    });

    return machines.map((machine) => ({
      value: machine.id.toString(),
      label: machine.name,
    }));
  }

  async getLines(): Promise<{ value: string; label: string }[]> {
    const lines = await this.lineRepository.find({
      select: ['id', 'name'],
    });

    return lines.map((line) => ({
      value: line.id.toString(),
      label: line.name,
    }));
  }
}
