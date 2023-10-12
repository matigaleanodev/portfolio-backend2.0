import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HardSkillInterface } from './hard-skill.interface';
import { ProfileEntity } from 'src/profile/models/profile.entity';

@Entity({ name: 'hard_skills' })
export class HardSkillEntity implements HardSkillInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  type: 'frontend' | 'backend' | 'tool';

  @Column({ unique: true })
  image: string;

  @Column({ unique: true })
  url: string;

  @ManyToOne(() => ProfileEntity, (profile) => profile.softSkills)
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
