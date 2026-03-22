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
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  cadence: number;

  @Column({ default: true })
  @ApiProperty()
  status: boolean;

  @ManyToOne(() => User, (user) => user.machine)
  @ApiProperty({ type: () => User })
  user: User;

  @ManyToOne(() => Line, (line) => line.machines)
  @ApiProperty({ type: () => Line })
  line: Line;

  @OneToMany(() => Record, (record) => record.machine)
  @ApiProperty({ type: () => [Record] })
  records: Record[];
}
