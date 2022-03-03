import { ApiHideProperty, PartialType } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Playlist } from "src/playlists/entities/playlist.entity";
import { CreateContentDto } from "./create-content.dto";

export class ContentDto extends PartialType(CreateContentDto) {
  id: string;

  @Exclude()
  @ApiHideProperty()
  userId: string;
}
