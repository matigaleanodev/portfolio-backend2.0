import { ProfileEntity } from 'src/profile/models/profile.entity';

export interface SofSkillInterface {
  id: number;
  name: string;
  description: string;
  image: string;
  profile: ProfileEntity;
  createdAt: Date;
}
