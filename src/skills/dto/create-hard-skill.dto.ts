import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateHardSkill {
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
