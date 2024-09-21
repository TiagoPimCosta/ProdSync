import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Record } from './record.entity';

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

  @Column()
  isActive: boolean;

  @Column({ nullable: true })
  admission: Date;

  @OneToMany(() => Record, (record) => record.user)
  records: Record[];
}
