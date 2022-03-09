import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { ScreensRepository } from "./screens.repository";

@Injectable()
export class EditScreensGuard implements CanActivate {
  constructor(private screensRepository: ScreensRepository) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const screen = await this.screensRepository.findOne(req.params.id, {
      relations: ["event"],
    });

    const userId: string = req.user.id;

    if (screen?.event.userId !== userId) {
      throw new ForbiddenException();
    }

    return true;
  }
}
