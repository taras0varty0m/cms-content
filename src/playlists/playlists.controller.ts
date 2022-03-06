import { Controller, UseGuards } from "@nestjs/common";
import { PlaylistsService } from "./playlists.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Crud, CrudAuth, CrudController } from "@nestjsx/crud";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Playlist } from "./entities/playlist.entity";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { PlaylistDto } from "./dto/playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { EditPlaylistsGuard } from "./edit-playlists.guard";
import { RequestUserDto } from "src/users/dto/request-user.dto";

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags("playlists")
@Crud({
  model: {
    type: Playlist,
  },
  serialize: {
    create: CreatePlaylistDto,
    update: UpdatePlaylistDto,
    replace: UpdatePlaylistDto,
    get: PlaylistDto,
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
      decorators: [UseGuards(EditPlaylistsGuard)],
    },
    deleteOneBase: {
      decorators: [UseGuards(EditPlaylistsGuard)],
    },
    replaceOneBase: {
      decorators: [UseGuards(EditPlaylistsGuard)],
    },
  },
})
@CrudAuth({
  property: "user",
  persist: (user: RequestUserDto) => ({ userId: user.id }),
})
@Controller("playlists")
export class PlaylistsController implements CrudController<Playlist> {
  constructor(public service: PlaylistsService) {}
}
