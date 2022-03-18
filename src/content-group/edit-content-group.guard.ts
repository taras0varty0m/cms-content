import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { ContentGroupRepository } from "./content-group.repository";

@Injectable()
export class EditContentGroupGuard implements CanActivate {
  constructor(private contentGroupRepository: ContentGroupRepository) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const content = await this.contentGroupRepository.findOne(req.params.id);

    const userId: string = req.user.id;

    if (content?.userId !== userId) {
      throw new ForbiddenException();
    }

    return true;
  }
}
