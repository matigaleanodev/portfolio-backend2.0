import { Module } from '@nestjs/common';
import { HardSkillController } from './controller/hard-skill.controller';
import { SoftSkillController } from './controller/soft-skill.controller';
import { HardSkillService } from './service/hard-skill.service';
import { SoftSkillService } from './service/soft-skill.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { HardSkillEntity } from './models/hard-skill.entity';
import { SoftSkillEntity } from './models/soft-skill.entity';
import { ProfileEntity } from 'src/profile/models/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HardSkillEntity, SoftSkillEntity, ProfileEntity]),
    AuthModule,
  ],
  controllers: [HardSkillController, SoftSkillController],
  providers: [HardSkillService, SoftSkillService],
})
export class SkillsModule {}
