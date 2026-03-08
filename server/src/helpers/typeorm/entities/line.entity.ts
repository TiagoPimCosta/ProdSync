import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Machine } from './machine.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'lines' })
export class Line {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ unique: true })
  @ApiProperty()
  name: string;

  @Column({ default: true })
  @ApiProperty()
  status: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  createdAt: Date;

  @OneToMany(() => Machine, (machine) => machine.line)
  @ApiProperty()
  machines: Machine[];
}
