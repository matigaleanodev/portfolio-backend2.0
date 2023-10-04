import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectEntity } from './models/project.entity';
import { ProjectService } from './service/project.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity]), AuthModule],
  providers: [ProjectService],
})
export class ProjectsModule {}
