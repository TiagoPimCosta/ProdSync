import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Machine } from './machine.entity';

@Entity({ name: 'records' })
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.records, { nullable: false })
  user: User;

  @ManyToOne(() => Machine, (machine) => machine.records, { nullable: false })
  machine: Machine;
}
