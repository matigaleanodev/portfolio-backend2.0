import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateProjectDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  @IsNotEmpty()
  image: string;

  @IsUrl()
  @IsNotEmpty()
  frontUrl: string;

  @IsUrl()
  @IsNotEmpty()
  backUrl: string;

  @IsUrl()
  @IsNotEmpty()
  demoUrl: string;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  profileId: number;
}
