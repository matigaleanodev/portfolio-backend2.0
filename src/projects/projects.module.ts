import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectEntity } from './models/project.entity';
import { ProjectService } from './service/project.service';
import { ProjectController } from './controller/project.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity]), AuthModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectsModule {}
