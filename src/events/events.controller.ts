import { Controller, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Event } from "./entities/event.entity";
import { Crud, CrudAuth, CrudController } from "@nestjsx/crud";
import { EventsService } from "./events.service";
import { EditEventsGuard } from "./edit-events.guard";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { EventDto } from "./dto/event.dto";
import { RequestUserDto } from "src/users/dto/request-user.dto";

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags("events")
@Crud({
  model: {
    type: Event,
  },

  serialize: {
    create: CreateEventDto,
    update: UpdateEventDto,
    replace: UpdateEventDto,
    get: EventDto,
  },
  params: {
    id: {
      field: "id",
      type: "uuid",
      primary: true,
    },
  },
  routes: {
    updateOneBase: {
      decorators: [UseGuards(EditEventsGuard)],
    },
    replaceOneBase: {
      decorators: [UseGuards(EditEventsGuard)],
    },
    deleteOneBase: {
      decorators: [UseGuards(EditEventsGuard)],
    },
  },
  validation: {
    transform: true,
  },
})
@CrudAuth({
  property: "user",
  persist: (user: RequestUserDto) => ({ userId: user.id }),
})
@Controller("events")
export class EventsController implements CrudController<Event> {
  constructor(public service: EventsService) {}
}
