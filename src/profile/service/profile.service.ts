import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from '../models/profile.entity';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { CreateProfileDTO } from '../dto/create-profile.dto';
import { UpdateProfileDTO } from '../dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}

  createProfile(profile: CreateProfileDTO): Observable<ProfileEntity> {
    const newProfile = this.profileRepository.create(profile);
    return from(this.profileRepository.save(newProfile));
  }

  getProfiles(): Observable<ProfileEntity[]> {
    return from(
      this.profileRepository.find({
        relations: ['projects', 'softSkills', 'hardSkills'],
      }),
    );
  }

  getProfileById(id: number): Observable<ProfileEntity> {
    return from(
      this.profileRepository.findOne({
        where: { id },
        relations: ['projects', 'softSkills', 'hardSkills'],
      }),
    ).pipe(
      map((foundProfile) => {
        if (foundProfile) {
          return foundProfile;
        }
        throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
      }),
    );
  }

  updateSkill(
    id: number,
    profile: UpdateProfileDTO,
  ): Observable<ProfileEntity | HttpException> {
    return from(
      this.profileRepository.findOne({
        where: { id },
      }),
    ).pipe(
      switchMap((foundProfile) => {
        if (foundProfile) {
          return from(
            this.profileRepository.update(foundProfile, profile),
          ).pipe(
            switchMap(() => {
              return from(
                this.profileRepository.findOne({
                  where: { id },
                  relations: ['projects', 'softSkills', 'hardSkills'],
                }),
              ).pipe(
                map((updatedProfile) => {
                  if (updatedProfile) {
                    return updatedProfile;
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
          return of(
            new HttpException('Profile not found', HttpStatus.NOT_FOUND),
          );
        }
      }),
    );
  }

  deleteProfile(id: number): Observable<ProfileEntity | HttpException> {
    return from(
      this.profileRepository.findOne({
        where: { id },
        relations: ['projects', 'softSkills', 'hardSkills'],
      }),
    ).pipe(
      switchMap((foundProfile) => {
        if (foundProfile) {
          return from(this.profileRepository.remove(foundProfile)).pipe(
            map(() => foundProfile),
          );
        } else {
          return of(
            new HttpException('Profile not found', HttpStatus.NOT_FOUND),
          );
        }
      }),
    );
  }
}
