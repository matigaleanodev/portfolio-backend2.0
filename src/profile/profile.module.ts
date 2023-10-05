import { Module } from '@nestjs/common';
import { ProfileController } from './controller/profile.controller';
import { ProfileService } from './service/profile.service';
import { ProfileEntity } from './models/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { HardSkillEntity } from 'src/skills/models/hard-skill.entity';
import { SoftSkillEntity } from 'src/skills/models/soft-skill.entity';
import { ProjectEntity } from 'src/projects/models/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProfileEntity,
      HardSkillEntity,
      SoftSkillEntity,
      ProjectEntity,
    ]),
    AuthModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
