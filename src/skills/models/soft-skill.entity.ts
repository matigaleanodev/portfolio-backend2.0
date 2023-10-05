import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SofSkillInterface } from './soft-skill.interface';
import { ProfileEntity } from 'src/profile/models/profile.entity';

@Entity({ name: 'soft_skills' })
export class SoftSkillEntity implements SofSkillInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ unique: true })
  image: string;

  @ManyToOne(() => ProfileEntity, (profile) => profile.softSkills)
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
