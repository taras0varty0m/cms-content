import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateContentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  extension: string;

  @IsNumber()
  duration: number;
}
