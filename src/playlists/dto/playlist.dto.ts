import { ApiHideProperty, PartialType } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { CreatePlaylistDto } from "./create-playlist.dto";

export class PlaylistDto extends PartialType(CreatePlaylistDto) {
  id: string;

  title: string;

  @Exclude()
  @ApiHideProperty()
  userId: string;
}
