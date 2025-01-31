import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectInterface } from './project.interface';
import { ProfileEntity } from 'src/profile/models/profile.entity';

@Entity({ name: 'projecs' })
export class ProjectEntity implements ProjectInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column()
  image: string;

  @Column({ nullable: true })
  frontUrl: string;

  @Column({ nullable: true })
  backUrl: string;

  @Column({ nullable: true })
  demoUrl: string;

  @Index()
  @ManyToOne(() => ProfileEntity, (profile) => profile.projects)
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
