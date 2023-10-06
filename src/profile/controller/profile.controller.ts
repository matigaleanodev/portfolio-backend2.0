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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private service: ProfileService) {}

  //Rest call: /api/profile
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Profile', description: 'Create a profile' })
  @ApiResponse({ status: 201, description: 'Profile created' })
  @Post()
  create(@Body() profile: CreateProfileDTO): Observable<ProfileEntity> {
    const result = this.service.createProfile(profile);
    return result;
  }

  //Rest call: /api/profile
  @Get()
  @ApiOperation({ summary: 'Profile', description: 'Get all profiles' })
  @ApiResponse({ status: 200, description: 'Profiles found' })
  getProfiles(): Observable<ProfileEntity[]> {
    const result = this.service.getProfiles();
    return result;
  }

  //Rest call: /api/profile/{id}
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Profile',
    description: 'Delete a profile',
  })
  @ApiResponse({ status: 200, description: 'Profile deleted' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<ProfileEntity | HttpException> {
    const result = this.service.deleteProfile(id);
    return result;
  }

  //Rest call: /api/profile/{id}
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Profile',
    description: 'Update a profile',
  })
  @ApiResponse({ status: 200, description: 'Profile updated' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
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
  @ApiOperation({
    summary: 'Profile',
    description: 'Get a profile by id',
  })
  @ApiResponse({ status: 200, description: 'Profile found' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  getProject(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<ProfileEntity | HttpException> {
    const result = this.service.getProfileById(id);
    return result;
  }
}
