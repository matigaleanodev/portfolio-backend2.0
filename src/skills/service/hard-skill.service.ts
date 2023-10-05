import { Injectable } from '@nestjs/common';
import { HardSkillEntity } from '../models/hard-skill.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';

@Injectable()
export class HardSkillService {
  constructor(
    @InjectRepository(HardSkillEntity)
    private skillRepository: Repository<HardSkillEntity>,
  ) {}

  getSkills(): Observable<HardSkillEntity[]> {
    return from(this.skillRepository.find());
  }
}
