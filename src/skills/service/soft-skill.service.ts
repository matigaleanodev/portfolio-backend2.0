import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoftSkillEntity } from '../models/soft-skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SoftSkillService {
  constructor(
    @InjectRepository(SoftSkillEntity)
    private skillRepository: Repository<SoftSkillEntity>,
  ) {}
}
