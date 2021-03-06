import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { EventsRepository } from "./events.repository";

@Injectable()
export class EditEventsGuard implements CanActivate {
  constructor(private eventsRepository: EventsRepository) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const event = await this.eventsRepository.findOne(req.params.id);

    const userId: string = req.user.id;

    if (event?.userId !== userId) {
      throw new ForbiddenException();
    }

    return true;
  }
}
