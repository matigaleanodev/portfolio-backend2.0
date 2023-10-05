import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { HardSkillInterface } from './hard-skill.interface';

export class HardSkillEntity implements HardSkillInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  type: 'frontend' | 'backend' | 'tool';

  @Column({ unique: true })
  image: string;

  @Column({ unique: true })
  url: string;
}
