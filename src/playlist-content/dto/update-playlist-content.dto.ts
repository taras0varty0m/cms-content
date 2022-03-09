import { OmitType, PartialType } from "@nestjs/swagger";
import { CreatePlaylistContentDto } from "./create-playlist-content.dto";

export class UpdatePlaylistContentDto extends PartialType(
  OmitType(CreatePlaylistContentDto, ["contentId", "playlistId"])
) {}
