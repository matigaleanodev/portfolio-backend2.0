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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Hard Skill')
@Controller('hard-skill')
export class HardSkillController {
  constructor(private service: HardSkillService) {}

  //Rest call: /api/hard-skill
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hard Skill', description: 'Create a hard skill' })
  @ApiResponse({ status: 201, description: 'Hard skill created' })
  @Post()
  create(@Body() skill: CreateHardSkillDTO): Observable<HardSkillEntity> {
    const result = this.service.createSkill(skill);
    return result;
  }

  //Rest call: /api/hard-skill
  @Get()
  @ApiOperation({ summary: 'Hard Skill', description: 'Get all hard skills' })
  @ApiResponse({ status: 200, description: 'Hard skills found' })
  getProjects(): Observable<HardSkillEntity[]> {
    const result = this.service.getSkills();
    return result;
  }

  //Rest call: /api/hard-skill/{id}
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hard Skill', description: 'Delete a hard skill' })
  @ApiResponse({ status: 200, description: 'Hard skill deleted' })
  @ApiResponse({ status: 404, description: 'Hard skill not found' })
  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<HardSkillEntity | HttpException> {
    const result = this.service.deleteSkill(id);
    return result;
  }

  //Rest call: /api/hard-skill/{id}
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hard Skill', description: 'Update a hard skill' })
  @ApiResponse({ status: 200, description: 'Hard skill updated' })
  @ApiResponse({ status: 404, description: 'Hard skill not found' })
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
  @ApiOperation({ summary: 'Hard Skill', description: 'Get a hard skill' })
  @ApiResponse({ status: 200, description: 'Hard skill found' })
  @ApiResponse({ status: 404, description: 'Hard skill not found' })
  getProject(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<HardSkillEntity | HttpException> {
    const result = this.service.getSkillById(id);
    return result;
  }
}
