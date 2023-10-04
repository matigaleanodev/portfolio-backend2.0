import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectEntity } from './models/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity]), AuthModule],
})
export class ProjectsModule {}
