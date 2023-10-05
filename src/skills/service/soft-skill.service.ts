import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoftSkillEntity } from '../models/soft-skill.entity';
import { Repository } from 'typeorm';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { CreateSoftSkillDTO } from '../dto/create-soft-skill.dto';
import { UpdateSoftSkillDTO } from '../dto/update-soft-skill.dto';

@Injectable()
export class SoftSkillService {
  constructor(
    @InjectRepository(SoftSkillEntity)
    private skillRepository: Repository<SoftSkillEntity>,
  ) {}
  createSkill(skill: CreateSoftSkillDTO): Observable<SoftSkillEntity> {
    const newSkill = this.skillRepository.create(skill);
    return from(this.skillRepository.save(newSkill));
  }

  getSkills(): Observable<SoftSkillEntity[]> {
    return from(this.skillRepository.find());
  }

  getSkillById(id: number): Observable<SoftSkillEntity> {
    return from(this.skillRepository.findOne({ where: { id } })).pipe(
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
              return from(this.skillRepository.findOne({ where: { id } })).pipe(
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
    return from(this.skillRepository.findOne({ where: { id } })).pipe(
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
}
