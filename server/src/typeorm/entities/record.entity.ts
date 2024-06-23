import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'records' })
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.records)
  user: User;

  @Column()
  machineId: number;

  @Column()
  createdAt: Date;
}
