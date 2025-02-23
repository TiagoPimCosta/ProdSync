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
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'machines' })
export class Machine {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ default: true })
  @ApiProperty()
  status: boolean;

  @OneToMany(() => Record, (record) => record.machine)
  @ApiProperty()
  records: Record[];

  @ManyToOne(() => Line, (line) => line.machine)
  @ApiProperty()
  line: Line;

  @ManyToOne(() => User, (user) => user.machine)
  user: User;
}
