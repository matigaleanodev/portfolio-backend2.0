/* eslint-disable prettier/prettier */
import { IsEmail, IsString } from 'class-validator';

export class CreateContactDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  message: string;
}
