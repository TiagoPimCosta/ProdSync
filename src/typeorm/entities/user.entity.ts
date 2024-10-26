import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Record } from './record.entity';
import { Machine } from './machine.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  idNumber: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  role: string;

  @Column()
  @ApiProperty()
  username: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column()
  @ApiProperty()
  cc: string;

  @Column()
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
  isActive: boolean;

  @Column({ nullable: true })
  @ApiProperty()
  admission: Date;

  @OneToMany(() => Machine, (machine) => machine.user)
  machine: Machine[];

  @OneToMany(() => Record, (record) => record.user)
  records: Record[];
}
