import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSoftSkillDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Skill name',
    example: 'Resilience',
    required: true,
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Skill description',
    example: 'Resilience is a skill that helps you to overcome obstacles.',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Skill image',
    example: 'image.png',
    required: true,
  })
  image: string;

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
  })
  profileId: number;
}
