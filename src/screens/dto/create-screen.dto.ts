import { IsDefined } from "class-validator";

export class CreateScreenDto {
  @IsDefined()
  playlistId: string;
}
