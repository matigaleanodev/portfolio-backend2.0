import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProfileDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the profile',
    example: 'My Profile',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Description of the profile',
    example: 'My Profile Description',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Image of the profile',
    example: 'image.jpg',
  })
  image: string;
}
