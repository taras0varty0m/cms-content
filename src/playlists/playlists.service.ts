import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Playlist } from "./entities/playlist.entity";
import { PlaylistsRepository } from "./playlists.repository";

@Injectable()
export class PlaylistsService extends TypeOrmCrudService<Playlist> {
  constructor(playlistsRepository: PlaylistsRepository) {
    super(playlistsRepository);
  }
}
