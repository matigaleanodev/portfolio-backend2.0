import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SoftSkillService } from '../service/soft-skill.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Observable } from 'rxjs';
import { CreateSoftSkillDTO } from '../dto/create-soft-skill.dto';
import { UpdateSoftSkillDTO } from '../dto/update-soft-skill.dto';
import { SoftSkillEntity } from '../models/soft-skill.entity';

@Controller('soft-skill')
export class SoftSkillController {
  constructor(private service: SoftSkillService) {}

  //Rest call: /api/soft-skill
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() skill: CreateSoftSkillDTO): Observable<SoftSkillEntity> {
    const result = this.service.createSkill(skill);
    return result;
  }

  //Rest call: /api/soft-skill
  @Get()
  getProjects(): Observable<SoftSkillEntity[]> {
    const result = this.service.getSkills();
    return result;
  }

  //Rest call: /api/soft-skill/{id}
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<SoftSkillEntity | HttpException> {
    const result = this.service.deleteSkill(id);
    return result;
  }

  //Rest call: /api/soft-skill/{id}
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() skill: UpdateSoftSkillDTO,
  ): Observable<SoftSkillEntity | HttpException> {
    const result = this.service.updateSkill(id, skill);
    return result;
  }

  //Rest call: /api/soft-skill/{id}
  @Get(':id')
  getProject(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<SoftSkillEntity | HttpException> {
    const result = this.service.getSkillById(id);
    return result;
  }
}
