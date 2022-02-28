import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  title: string;
}
