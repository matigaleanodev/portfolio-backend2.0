import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateSoftSkillDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  @IsNotEmpty()
  image: string;
}
