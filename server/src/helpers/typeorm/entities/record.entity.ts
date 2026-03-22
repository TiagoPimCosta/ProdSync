import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Machine } from './machine.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'records' })
export class Record {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.records)
  @ApiProperty({ type: () => User })
  user: User;

  @ManyToOne(() => Machine, (machine) => machine.records)
  @ApiProperty({ type: () => Machine })
  machine: Machine;
}
