import { IsString, IsNotEmpty, IsUrl, IsNumber } from 'class-validator';

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

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  profileId: number;
}
