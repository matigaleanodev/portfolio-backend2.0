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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('project')
export class ProjectController {
  constructor(private service: ProjectService) {}

  //Rest call: /api/project
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Project', description: 'Create a project' })
  @ApiResponse({ status: 201, description: 'Project created' })
  @Post()
  create(@Body() project: CreateProjectDTO): Observable<ProjectEntity> {
    const result = this.service.createProject(project);
    return result;
  }

  //Rest call: /api/project
  @Get()
  @ApiOperation({ summary: 'Project', description: 'Get all projects' })
  @ApiResponse({ status: 200, description: 'Projects found' })
  getProjects(): Observable<ProjectEntity[]> {
    const result = this.service.getProjects();
    return result;
  }

  //Rest call: /api/project/{id}
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Project', description: 'Delete a project' })
  @ApiResponse({ status: 200, description: 'Project deleted' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<ProjectEntity | HttpException> {
    const result = this.service.deleteProject(id);
    return result;
  }

  //Rest call: /api/project/{id}
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Project', description: 'Update a project' })
  @ApiResponse({ status: 200, description: 'Project updated' })
  @ApiResponse({ status: 404, description: 'Project not found' })
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
  @ApiOperation({ summary: 'Project', description: 'Get a project' })
  @ApiResponse({ status: 200, description: 'Project found' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  getProject(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<ProjectEntity | HttpException> {
    const result = this.service.getProjectById(id);
    return result;
  }
}
