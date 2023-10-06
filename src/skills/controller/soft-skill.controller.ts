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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Soft Skill')
@Controller('soft-skill')
export class SoftSkillController {
  constructor(private service: SoftSkillService) {}

  //Rest call: /api/soft-skill
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft Skill', description: 'Create a soft skill' })
  @ApiResponse({ status: 201, description: 'Soft skill created' })
  @Post()
  create(@Body() skill: CreateSoftSkillDTO): Observable<SoftSkillEntity> {
    const result = this.service.createSkill(skill);
    return result;
  }

  //Rest call: /api/soft-skill
  @Get()
  @ApiOperation({ summary: 'Soft Skill', description: 'Get all soft skills' })
  @ApiResponse({ status: 200, description: 'Soft skills found' })
  getProjects(): Observable<SoftSkillEntity[]> {
    const result = this.service.getSkills();
    return result;
  }

  //Rest call: /api/soft-skill/{id}
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Soft Skill', description: 'Delete a soft skill' })
  @ApiResponse({ status: 200, description: 'Soft skill deleted' })
  @ApiResponse({ status: 404, description: 'Soft skill not found' })
  delete(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<SoftSkillEntity | HttpException> {
    const result = this.service.deleteSkill(id);
    return result;
  }

  //Rest call: /api/soft-skill/{id}
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft Skill', description: 'Update a soft skill' })
  @ApiResponse({ status: 200, description: 'Soft skill updated' })
  @ApiResponse({ status: 404, description: 'Soft skill not found' })
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
  @ApiOperation({ summary: 'Soft Skill', description: 'Get a soft skill' })
  @ApiResponse({ status: 200, description: 'Soft skill found' })
  @ApiResponse({ status: 404, description: 'Soft skill not found' })
  getProject(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<SoftSkillEntity | HttpException> {
    const result = this.service.getSkillById(id);
    return result;
  }
}
