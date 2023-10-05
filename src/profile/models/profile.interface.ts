import { ProjectEntity } from 'src/projects/models/project.entity';
import { HardSkillEntity } from 'src/skills/models/hard-skill.entity';
import { SoftSkillEntity } from 'src/skills/models/soft-skill.entity';

export interface ProfileInterface {
  id: number;
  name: string;
  description: string;
  image: string;
  softSkills: SoftSkillEntity[];
  hardSkills: HardSkillEntity[];
  projects: ProjectEntity[];
  createdAt: Date;
}
