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
import { HardSkillService } from '../service/hard-skill.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { HardSkillEntity } from '../models/hard-skill.entity';
import { UpdateHardSkillDTO } from '../dto/update-hard-skill.dto';
import { Observable } from 'rxjs';
import { CreateHardSkillDTO } from '../dto/create-hard-skill.dto';

@Controller('hard-skill')
export class HardSkillController {
  constructor(private service: HardSkillService) {}

  //Rest call: /api/hard-skill
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() skill: CreateHardSkillDTO): Observable<HardSkillEntity> {
    const result = this.service.createSkill(skill);
    return result;
  }

  //Rest call: /api/hard-skill
  @Get()
  getProjects(): Observable<HardSkillEntity[]> {
    const result = this.service.getSkills();
    return result;
  }

  //Rest call: /api/hard-skill/{id}
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<HardSkillEntity | HttpException> {
    const result = this.service.deleteSkill(id);
    return result;
  }

  //Rest call: /api/hard-skill/{id}
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() skill: UpdateHardSkillDTO,
  ): Observable<HardSkillEntity | HttpException> {
    const result = this.service.updateSkill(id, skill);
    return result;
  }

  //Rest call: /api/hard-skill/{id}
  @Get(':id')
  getProject(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<HardSkillEntity | HttpException> {
    const result = this.service.getSkillById(id);
    return result;
  }
}
