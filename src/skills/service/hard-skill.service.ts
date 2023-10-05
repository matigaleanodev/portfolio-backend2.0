import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HardSkillEntity } from '../models/hard-skill.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { CreateHardSkillDTO } from '../dto/create-hard-skill.dto';
import { UpdateHardSkillDTO } from '../dto/update-hard-skill.dto';

@Injectable()
export class HardSkillService {
  constructor(
    @InjectRepository(HardSkillEntity)
    private skillRepository: Repository<HardSkillEntity>,
  ) {}

  createSkill(skill: CreateHardSkillDTO): Observable<HardSkillEntity> {
    const newSkill = this.skillRepository.create(skill);
    return from(this.skillRepository.save(newSkill));
  }

  getSkills(): Observable<HardSkillEntity[]> {
    return from(this.skillRepository.find());
  }

  getSkillById(id: number): Observable<HardSkillEntity> {
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
    skill: UpdateHardSkillDTO,
  ): Observable<HardSkillEntity | HttpException> {
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

  deleteSkill(id: number): Observable<HardSkillEntity | HttpException> {
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
