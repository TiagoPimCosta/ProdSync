import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Machine } from './machine.entity';

@Entity({ name: 'records' })
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.records)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Machine, (machine) => machine.records)
  machine: Machine;

  @Column()
  createdAt: Date;
}
