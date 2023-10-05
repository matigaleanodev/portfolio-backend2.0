import { ProfileEntity } from 'src/profile/models/profile.entity';

export interface ProjectInterface {
  id: number;
  name: string;
  description: string;
  image: string;
  frontUrl: string;
  backUrl: string;
  demoUrl: string;
  profile: ProfileEntity;
  createdAt: Date;
}
