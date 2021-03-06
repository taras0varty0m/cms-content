import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { PlaylistsRepository } from "./playlists.repository";

@Injectable()
export class EditPlaylistsGuard implements CanActivate {
  constructor(private playlistsRepository: PlaylistsRepository) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const playlist = await this.playlistsRepository.findOne(req.params.id);

    const userId: string = req.user.id;

    if (playlist?.userId !== userId) {
      throw new ForbiddenException();
    }

    return true;
  }
}
