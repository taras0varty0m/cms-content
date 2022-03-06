import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { PlaylistContentRepository } from "./playlist-content.repository";

@Injectable()
export class EditPlaylistContentGuard implements CanActivate {
  constructor(private playlistContentRepository: PlaylistContentRepository) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const playlistContent = await this.playlistContentRepository.findOne(
      req.params.id,
      {
        relations: ["playlist", "content"],
      }
    );

    const userId: string = req.user.id;

    if (
      playlistContent?.content.userId !== userId &&
      playlistContent?.playlist.userId !== userId
    ) {
      throw new ForbiddenException();
    }

    return true;
  }
}
