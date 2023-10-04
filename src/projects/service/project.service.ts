import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../models/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDTO } from '../dto/create-project.dto';
import { Observable, from } from 'rxjs';
import { ProjectInterface } from '../models/project.interface';
import { UpdateProjectDTO } from '../dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
  ) {}

  createProject(project: CreateProjectDTO): Observable<ProjectInterface> {
    const newProject = this.projectRepository.create(project);
    return from(this.projectRepository.save(newProject));
  }

  getProjects(): Observable<ProjectInterface[]> {
    return from(this.projectRepository.find());
  }

  async getProjectById(id: number) {
    const foundProject = await this.projectRepository.findOne({
      where: { id },
    });
    if (foundProject) {
      return foundProject;
    } else {
      return new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateProject(id: number, project: UpdateProjectDTO) {
    const foundProject = await this.projectRepository.findOne({
      where: { id },
    });
    if (foundProject) {
      return this.projectRepository.update({ id }, project);
    } else {
      return new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteProject(id: number) {
    const foundProject = await this.projectRepository.findOne({
      where: { id },
    });
    if (foundProject) {
      return this.projectRepository.delete({ id });
    } else {
      return new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
  }
}
