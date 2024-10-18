import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Record } from './record.entity';
import { Machine } from './machine.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idNumber: number;

  @Column()
  name: string;

  @Column()
  role: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  cc: string;

  @Column()
  nif: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  admission: Date;

  @OneToMany(() => Machine, (machine) => machine.user)
  machine: Machine[];

  @OneToMany(() => Record, (record) => record.user)
  records: Record[];
}
