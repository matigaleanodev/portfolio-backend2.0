import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from '../service/project.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateProjectDTO } from '../dto/create-project.dto';
import { Observable } from 'rxjs';
import { UpdateProjectDTO } from '../dto/update-project.dto';
import { ProjectEntity } from '../models/project.entity';

@Controller('project')
export class ProjectController {
  constructor(private service: ProjectService) {}

  //Rest call: /api/project
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() project: CreateProjectDTO): Observable<ProjectEntity> {
    const result = this.service.createProject(project);
    return result;
  }

  //Rest call: /api/project
  @Get()
  getProjects(): Observable<ProjectEntity[]> {
    const result = this.service.getProjects();
    return result;
  }

  //Rest call: /api/project/{id}
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<ProjectEntity | HttpException> {
    const result = this.service.deleteProject(id);
    return result;
  }

  //Rest call: /api/project/{id}
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() project: UpdateProjectDTO,
  ): Observable<ProjectEntity | HttpException> {
    const result = this.service.updateProject(id, project);
    return result;
  }

  //Rest call: /api/project/{id}
  @Get(':id')
  getProject(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<ProjectEntity | HttpException> {
    const result = this.service.getProjectById(id);
    return result;
  }
}
