/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectInterface } from './project.interface';

@Entity({ name: 'projecs' })
export class ProjectEntity implements ProjectInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column()
  image: string;

  @Column({ nullable: true })
  frontUrl: string;

  @Column({ nullable: true })
  backUrl: string;

  @Column({ nullable: true })
  demoUrl: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
