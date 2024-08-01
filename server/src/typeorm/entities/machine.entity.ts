import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Record } from './record.entity';

@Entity({ name: 'machines' })
export class Machine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Record, (record) => record.machine)
  records: Record[];
}
