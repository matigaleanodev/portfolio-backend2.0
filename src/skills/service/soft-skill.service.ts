import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoftSkillEntity } from '../models/soft-skill.entity';
import { Repository } from 'typeorm';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { CreateSoftSkillDTO } from '../dto/create-soft-skill.dto';
import { UpdateSoftSkillDTO } from '../dto/update-soft-skill.dto';
import { ProfileEntity } from 'src/profile/models/profile.entity';

@Injectable()
export class SoftSkillService {
  constructor(
    @InjectRepository(SoftSkillEntity)
    private skillRepository: Repository<SoftSkillEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}
  createSkill(skill: CreateSoftSkillDTO): Observable<SoftSkillEntity> {
    return from(
      this.profileRepository.findOne({ where: { id: skill.profileId } }),
    ).pipe(
      switchMap((foundProfile) => {
        if (!foundProfile) {
          throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
        }
        const newSkill = this.skillRepository.create({
          ...skill,
          profile: foundProfile,
        });
        return from(this.nameExists(newSkill.name)).pipe(
          switchMap((nameExist) => {
            if (nameExist) {
              throw new HttpException(
                'Skill name already exists',
                HttpStatus.CONFLICT,
              );
            } else {
              return from(this.skillRepository.save(newSkill)).pipe(
                map((savedSkill) => {
                  return savedSkill;
                }),
              );
            }
          }),
        );
      }),
    );
  }

  getSkills(): Observable<SoftSkillEntity[]> {
    return from(this.skillRepository.find({ relations: ['profile'] }));
  }

  getSkillById(id: number): Observable<SoftSkillEntity> {
    return from(
      this.skillRepository.findOne({ where: { id }, relations: ['profile'] }),
    ).pipe(
      map((foundSkill) => {
        if (foundSkill) {
          return foundSkill;
        }
        throw new HttpException('Skill not found', HttpStatus.NOT_FOUND);
      }),
    );
  }

  updateSkill(
    id: number,
    skill: UpdateSoftSkillDTO,
  ): Observable<SoftSkillEntity | HttpException> {
    return from(
      this.skillRepository.findOne({
        where: { id },
      }),
    ).pipe(
      switchMap((foundSkill) => {
        if (foundSkill) {
          return from(this.skillRepository.update(foundSkill, skill)).pipe(
            switchMap(() => {
              return from(
                this.skillRepository.findOne({
                  where: { id },
                  relations: ['profile'],
                }),
              ).pipe(
                map((updatedSkill) => {
                  if (updatedSkill) {
                    return updatedSkill;
                  }
                  throw new HttpException(
                    'Skill not found',
                    HttpStatus.NOT_FOUND,
                  );
                }),
              );
            }),
          );
        } else {
          return of(new HttpException('Skill not found', HttpStatus.NOT_FOUND));
        }
      }),
    );
  }

  deleteSkill(id: number): Observable<SoftSkillEntity | HttpException> {
    return from(
      this.skillRepository.findOne({ where: { id }, relations: ['profile'] }),
    ).pipe(
      switchMap((foundSkill) => {
        if (foundSkill) {
          return from(this.skillRepository.remove(foundSkill)).pipe(
            map(() => foundSkill),
          );
        } else {
          return of(new HttpException('Skill not found', HttpStatus.NOT_FOUND));
        }
      }),
    );
  }

  private nameExists(name: string): Observable<boolean> {
    name = name.toLowerCase();
    return from(this.skillRepository.findOne({ where: { name } })).pipe(
      map((exist) => {
        return exist ? true : false;
      }),
    );
  }
}
