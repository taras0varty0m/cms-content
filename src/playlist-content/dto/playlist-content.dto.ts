import { PartialType } from "@nestjs/swagger";
import { CreatePlaylistContentDto } from "./create-playlist-content.dto";

export class PlaylistContentDto extends PartialType(CreatePlaylistContentDto) {
  id: string;
}
