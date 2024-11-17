import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Record } from './record.entity';
import { Machine } from './machine.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @ApiProperty()
  idNumber: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  role: string;

  @Column({ unique: true })
  @ApiProperty()
  username: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column({ unique: true })
  @ApiProperty()
  cc: string;

  @Column({ unique: true })
  @ApiProperty()
  nif: string;

  @Column()
  @ApiProperty()
  phone: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column({ default: true })
  @ApiProperty()
  status: boolean;

  @Column({ nullable: true })
  @ApiProperty()
  admission: Date;

  @OneToMany(() => Machine, (machine) => machine.user)
  machine: Machine[];

  @OneToMany(() => Record, (record) => record.user)
  records: Record[];
}
