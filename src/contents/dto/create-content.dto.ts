import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsDefined } from "class-validator";

export class CreateContentDto {
  @IsNotEmpty()
  @IsDefined()
  href: string;
}
