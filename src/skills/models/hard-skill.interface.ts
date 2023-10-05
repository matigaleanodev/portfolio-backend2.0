import { ProfileEntity } from 'src/profile/models/profile.entity';

export interface HardSkillInterface {
  id: number;
  name: string;
  type: 'frontend' | 'backend' | 'tool';
  image: string;
  url: string;
  profile: ProfileEntity;
  createdAt: Date;
}
