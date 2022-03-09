import { Repository } from "typeorm";
import { EntityRepository } from "typeorm/decorator/EntityRepository";
import { PlaylistContent } from "./entities/playlist-content.entity";

@EntityRepository(PlaylistContent)
export class PlaylistContentRepository extends Repository<PlaylistContent> {}
