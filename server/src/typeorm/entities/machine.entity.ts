import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Record } from './record.entity';
import { Line } from './line.entity';
import { User } from './user.entity';

@Entity({ name: 'machines' })
export class Machine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Record, (record) => record.machine)
  records: Record[];

  @ManyToOne(() => Line, (line) => line.machine)
  line: Line;

  @ManyToOne(() => User, (user) => user.machine)
  user: User;
}
