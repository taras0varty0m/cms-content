import { IsDefined, IsNumber } from "class-validator";

export class CreateScreenDto {
  @IsDefined()
  playlistId: string;
}
