import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { SofSkillInterface } from './soft-skill.interface';

export class SoftSkillEntity implements SofSkillInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ unique: true })
  image: string;
}
