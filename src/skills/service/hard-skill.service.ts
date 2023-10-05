import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HardSkillEntity } from '../models/hard-skill.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { CreateHardSkillDTO } from '../dto/create-hard-skill.dto';
import { UpdateHardSkillDTO } from '../dto/update-hard-skill.dto';
import { ProfileEntity } from 'src/profile/models/profile.entity';

@Injectable()
export class HardSkillService {
  constructor(
    @InjectRepository(HardSkillEntity)
    private skillRepository: Repository<HardSkillEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}

  createSkill(skill: CreateHardSkillDTO): Observable<HardSkillEntity> {
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
        return from(this.skillRepository.save(newSkill)).pipe(
          map((savedSkill) => {
            return savedSkill;
          }),
        );
      }),
    );
  }

  getSkills(): Observable<HardSkillEntity[]> {
    return from(this.skillRepository.find({ relations: ['profile'] }));
  }

  getSkillById(id: number): Observable<HardSkillEntity> {
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

  deleteSkill(id: number): Observable<HardSkillEntity | HttpException> {
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
}
