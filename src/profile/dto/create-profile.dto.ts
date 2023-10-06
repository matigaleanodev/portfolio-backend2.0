import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

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

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Image of the profile',
    example: 'https://example.com/image.jpg',
  })
  image: string;
}
