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
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Observable } from 'rxjs';
import { ProfileService } from '../service/profile.service';
import { ProfileEntity } from '../models/profile.entity';
import { CreateProfileDTO } from '../dto/create-profile.dto';
import { UpdateProfileDTO } from '../dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private service: ProfileService) {}

  //Rest call: /api/profile
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() profile: CreateProfileDTO): Observable<ProfileEntity> {
    const result = this.service.createProfile(profile);
    return result;
  }

  //Rest call: /api/profile
  @Get()
  getProjects(): Observable<ProfileEntity[]> {
    const result = this.service.getProfiles();
    return result;
  }

  //Rest call: /api/profile/{id}
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<ProfileEntity | HttpException> {
    const result = this.service.deleteProfile(id);
    return result;
  }

  //Rest call: /api/profile/{id}
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() profile: UpdateProfileDTO,
  ): Observable<ProfileEntity | HttpException> {
    const result = this.service.updateProfile(id, profile);
    return result;
  }

  //Rest call: /api/profile/{id}
  @Get(':id')
  getProject(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<ProfileEntity | HttpException> {
    const result = this.service.getProfileById(id);
    return result;
  }
}
