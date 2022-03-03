import { IsDefined } from "class-validator";

export class CreatePlaylistContentDto {
  @IsDefined()
  playlistId: string;

  @IsDefined()
  contentId: string;

  @IsDefined()
  duration: number;

  @IsDefined()
  priority: number;
}
