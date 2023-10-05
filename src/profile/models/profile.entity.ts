import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileInterface } from './profile.interface';
import { ProjectEntity } from 'src/projects/models/project.entity';
import { HardSkillEntity } from 'src/skills/models/hard-skill.entity';
import { SoftSkillEntity } from 'src/skills/models/soft-skill.entity';

@Entity({ name: 'profile' })
export class ProfileEntity implements ProfileInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  image: string;

  @OneToMany(() => SoftSkillEntity, (softskill) => softskill.profile)
  softSkills: SoftSkillEntity[];

  @OneToMany(() => HardSkillEntity, (hardSkill) => hardSkill.profile)
  hardSkills: HardSkillEntity[];

  @OneToMany(() => ProjectEntity, (project) => project.profile)
  projects: ProjectEntity[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  editedAt: Date;
}
