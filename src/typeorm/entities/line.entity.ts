import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Machine } from './machine.entity';

@Entity({ name: 'lines' })
export class Line {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Machine, (machine) => machine.line)
  machine: Machine[];
}
