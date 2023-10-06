import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSoftSkillDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Skill name',
    example: 'Resilence',
    required: true,
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Skill description',
    example: 'Resilence is a skill that helps you to overcome obstacles.',
  })
  description: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Skill image',
    example: 'https://example.com/image.png',
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
