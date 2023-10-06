/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateContactDTO {
  @IsString()
  @ApiProperty({ example: 'John Doe', description: 'visitor name' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'example@mail.com', description: 'visitor email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'this is a message', description: 'visitor message' })
  message: string;
}
