import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { ContentsRepository } from "./Contents.repository";

@Injectable()
export class EditContentsGuard implements CanActivate {
  constructor(private contentsRepository: ContentsRepository) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const content = await this.contentsRepository.findOne(req.params.id);

    if (!content) {
      throw new HttpException(
        `Content with ID=${req.params.id} not found`,
        HttpStatus.NOT_FOUND
      );
    }
    const userId: string = req.user.id;

    if (content.userId !== userId) {
      throw new ForbiddenException();
    }

    return true;
  }
}
