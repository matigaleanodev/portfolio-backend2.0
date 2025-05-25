import { ProfileInterface } from 'src/profile/models/profile.interface';

export interface UserInterface {
  id: number;
  email: string;
  password?: string;
  profile: ProfileInterface;
  refreshToken: string | null;
  createdAt: Date;
}
