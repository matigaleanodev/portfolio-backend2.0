import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../models/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDTO } from '../dto/create-project.dto';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { UpdateProjectDTO } from '../dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
  ) {}

  createProject(project: CreateProjectDTO): Observable<ProjectEntity> {
    const newProject = this.projectRepository.create(project);
    return from(this.projectRepository.save(newProject));
  }

  getProjects(): Observable<ProjectEntity[]> {
    return from(this.projectRepository.find());
  }

  getProjectById(id: number): Observable<ProjectEntity | HttpException> {
    return from(this.projectRepository.findOne({ where: { id } })).pipe(
      map((foundProject) => {
        if (foundProject) {
          return foundProject;
        } else {
          throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
        }
      }),
    );
  }

  updateProject(
    id: number,
    project: UpdateProjectDTO,
  ): Observable<ProjectEntity | HttpException> {
    return from(
      this.projectRepository.findOne({
        where: { id },
      }),
    ).pipe(
      switchMap((foundProject) => {
        if (foundProject) {
          // Realiza la actualización
          return from(
            this.projectRepository.update(foundProject, project),
          ).pipe(
            switchMap(() => {
              // Obtiene el objeto actualizado
              return from(
                this.projectRepository.findOne({ where: { id } }),
              ).pipe(
                map((updatedProject) => {
                  if (updatedProject) {
                    return updatedProject;
                  } else {
                    return new HttpException(
                      'Project not found',
                      HttpStatus.NOT_FOUND,
                    );
                  }
                }),
              );
            }),
          );
        } else {
          return of(
            new HttpException('Project not found', HttpStatus.NOT_FOUND),
          );
        }
      }),
    );
  }

  deleteProject(id: number): Observable<ProjectEntity | HttpException> {
    return from(
      this.projectRepository.findOne({
        where: { id },
      }),
    ).pipe(
      switchMap((foundProject) => {
        if (foundProject) {
          return from(this.projectRepository.delete({ id })).pipe(
            map(() => {
              return foundProject;
            }),
          );
        } else {
          return of(
            new HttpException('Project not found', HttpStatus.NOT_FOUND),
          );
        }
      }),
    );
  }
}
