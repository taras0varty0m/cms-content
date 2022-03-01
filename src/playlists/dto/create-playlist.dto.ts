import { IsDefined, IsString, MaxLength, IsNotEmpty } from "class-validator";

export class CreatePlaylistDto {
  @IsDefined()
  @IsString()
  @MaxLength(32)
  @IsNotEmpty()
  title: string;
}
