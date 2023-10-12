import { IsString, IsNotEmpty, IsUrl, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHardSkillDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Skill name',
    example: 'HTML',
    required: true,
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Skill type',
    example: 'frontend',
    enum: ['frontend', 'backend', 'tool'],
    nullable: false,
    required: true,
  })
  type: 'frontend' | 'backend' | 'tool';

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Skill image',
    example: 'image.png',
    required: true,
  })
  image: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Skill url',
    example: 'https://example.com',
    required: true,
  })
  url: string;

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
