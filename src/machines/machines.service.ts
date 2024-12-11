import { Injectable } from '@nestjs/common';
import { Machine } from 'src/typeorm/entities/machine.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateMachineParams,
  UpdateMachineParams,
} from 'src/params/machines.params';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine) private machineRepository: Repository<Machine>,
  ) {}

  create(createMachineDto: CreateMachineParams) {
    const newMachine = this.machineRepository.create({
      ...createMachineDto,
    });
    return this.machineRepository.save(newMachine);
  }

  findAll() {
    return this.machineRepository.find();
  }

  findOne(id: number) {
    return this.machineRepository.findOne({
      where: { id },
      relations: ['records'],
    });
  }

  update(id: number, updateMachineDetails: UpdateMachineParams) {
    return this.machineRepository.update({ id }, { ...updateMachineDetails });
  }

  remove(id: number) {
    return this.machineRepository.delete({ id });
  }
}
