import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsDefined } from "class-validator";

export class CreateContentDto {
  @IsNotEmpty()
  @IsString()
  href: string;

  @IsNotEmpty()
  @IsString()
  playlistId: string;

  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  duration: number;
}
