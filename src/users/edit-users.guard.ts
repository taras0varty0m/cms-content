import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { UsersRepository } from "./users.repository";

@Injectable()
export class EditUsersGuard implements CanActivate {
  constructor(private usersRepository: UsersRepository) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user = await this.usersRepository.findOne(req.params.id);

    if (!user) {
      throw new HttpException(
        `user with ID=${req.params.id} not found`,
        HttpStatus.NOT_FOUND
      );
    }

    const userId: string = req.user.id;
    if (user.id !== userId) {
      throw new ForbiddenException();
    }

    return true;
  }
}
