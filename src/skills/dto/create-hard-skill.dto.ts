import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateHardSkillDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: 'frontend' | 'backend' | 'tool';

  @IsUrl()
  @IsNotEmpty()
  image: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;
}
