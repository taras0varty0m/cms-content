import { Controller, UseGuards } from "@nestjs/common";
import { PlaylistContentService } from "./playlist-content.service";
import { CreatePlaylistContentDto } from "./dto/create-playlist-content.dto";
import { UpdatePlaylistContentDto } from "./dto/update-playlist-content.dto";
import { EditPlaylistContentGuard } from "./playlist-content.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Crud, CrudAuth, CrudController } from "@nestjsx/crud";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RequestUserDto } from "src/users/dto/request-user.dto";
import { PlaylistContentDto } from "./dto/playlist-content.dto";
import { PlaylistContent } from "./entities/playlist-content.entity";

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags("playlist-content")
@Crud({
  model: {
    type: PlaylistContentDto,
  },
  dto: {
    create: CreatePlaylistContentDto,
    update: UpdatePlaylistContentDto,
  },
  params: {
    id: {
      field: "id",
      type: "uuid",
      primary: true,
    },
  },
  routes: {
    updateOneBase: {
      decorators: [UseGuards(EditPlaylistContentGuard)],
    },
    deleteOneBase: {
      decorators: [UseGuards(EditPlaylistContentGuard)],
    },
    replaceOneBase: {
      decorators: [UseGuards(EditPlaylistContentGuard)],
    },
  },
})
@Controller("playlist-content")
export class PlaylistContentController
  implements CrudController<PlaylistContent>
{
  constructor(public service: PlaylistContentService) {}
}
