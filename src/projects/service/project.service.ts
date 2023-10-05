import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../models/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDTO } from '../dto/create-project.dto';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { UpdateProjectDTO } from '../dto/update-project.dto';
import { ProfileEntity } from 'src/profile/models/profile.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}

  createProject(project: CreateProjectDTO): Observable<ProjectEntity> {
    return from(
      this.profileRepository.findOne({ where: { id: project.profileId } }),
    ).pipe(
      switchMap((foundProfile) => {
        if (!foundProfile) {
          throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
        }
        const newProject = this.projectRepository.create({
          ...project,
          profile: foundProfile,
        });
        return from(this.nameExists(newProject.name)).pipe(
          switchMap((nameExist) => {
            if (nameExist) {
              throw new HttpException(
                'Projectname already exists',
                HttpStatus.CONFLICT,
              );
            } else {
              return from(this.projectRepository.save(newProject)).pipe(
                map((savedProject) => {
                  return savedProject;
                }),
              );
            }
          }),
        );
      }),
    );
  }

  getProjects(): Observable<ProjectEntity[]> {
    return from(this.projectRepository.find({ relations: ['profile'] }));
  }

  getProjectById(id: number): Observable<ProjectEntity | HttpException> {
    return from(
      this.projectRepository.findOne({ where: { id }, relations: ['profile'] }),
    ).pipe(
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
                this.projectRepository.findOne({
                  where: { id },
                  relations: ['profile'],
                }),
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
        relations: ['profile'],
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

  private nameExists(name: string): Observable<boolean> {
    name = name.toLowerCase();
    return from(this.projectRepository.findOne({ where: { name } })).pipe(
      map((exist) => {
        return exist ? true : false;
      }),
    );
  }
}
