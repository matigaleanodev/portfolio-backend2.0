import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Project name',
    example: 'Project name',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Project description',
    example: 'Project description',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Image of the project',
    example: 'image.jpg',
  })
  image: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    description: 'Frontend repo url',
    example: 'https://github.com/user/repo',
    required: false,
    nullable: true,
  })
  frontUrl: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    description: 'Backend repo url',
    example: 'https://github.com/user/repo',
    required: false,
    nullable: true,
  })
  backUrl: string;

  @IsUrl()
  @ApiProperty({
    description: 'Demo url',
    example: 'https://example.com/demo',
    required: false,
    nullable: true,
  })
  demoUrl: string;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  @ApiProperty({
    description: 'Profile id',
    example: 1,
    required: true,
    nullable: false,
  })
  profileId: number;
}
