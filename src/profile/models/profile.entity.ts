import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Index,
  UpdateDateColumn,
} from 'typeorm';
import { ProfileInterface } from './profile.interface';
import { ProjectEntity } from 'src/projects/models/project.entity';
import { HardSkillEntity } from 'src/skills/models/hard-skill.entity';
import { SoftSkillEntity } from 'src/skills/models/soft-skill.entity';

@Entity({ name: 'profile' })
export class ProfileEntity implements ProfileInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  image: string;

  @OneToMany(() => SoftSkillEntity, (softSkill) => softSkill.profile, {
    eager: true,
  })
  softSkills: SoftSkillEntity[];

  @OneToMany(() => HardSkillEntity, (hardSkill) => hardSkill.profile, {
    eager: true,
  })
  hardSkills: HardSkillEntity[];

  @OneToMany(() => ProjectEntity, (project) => project.profile, { eager: true })
  projects: ProjectEntity[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @Index()
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  editedAt: Date;
}
