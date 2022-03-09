import { Repository } from "typeorm";
import { EntityRepository } from "typeorm/decorator/EntityRepository";
import { Playlist } from "./entities/playlist.entity";

@EntityRepository(Playlist)
export class PlaylistsRepository extends Repository<Playlist> {}
