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
import { ProjectInterface } from '../models/project.interface';
import { UpdateProjectDTO } from '../dto/update-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private service: ProjectService) {}

  //Rest call: /api/project
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() project: CreateProjectDTO): Observable<ProjectInterface> {
    return this.service.createProject(project);
  }

  //Rest call: /api/project
  @Get()
  getProjects(): Observable<ProjectInterface[]> {
    return this.service.getProjects();
  }

  //Rest call: /api/project/{id}
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<ProjectInterface | HttpException> {
    return this.service.deleteProject(id);
  }

  //Rest call: /api/project/{id}
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() project: UpdateProjectDTO,
  ): Observable<ProjectInterface | HttpException> {
    return this.service.updateProject(id, project);
  }

  //Rest call: /api/project/{id}
  @Get(':id')
  getProject(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<ProjectInterface | HttpException> {
    const result = this.service.getProjectById(id);
    return result;
  }
}
