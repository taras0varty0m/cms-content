import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { PlaylistContent } from "./entities/playlist-content.entity";
import { PlaylistContentRepository } from "./playlist-content.repository";

@Injectable()
export class PlaylistContentService extends TypeOrmCrudService<PlaylistContent> {
  constructor(playlistContentRepository: PlaylistContentRepository) {
    super(playlistContentRepository);
  }
}
