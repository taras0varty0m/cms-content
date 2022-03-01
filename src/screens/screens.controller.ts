import { Controller, UseGuards } from "@nestjs/common";
import { ScreensService } from "./screens.service";
import { Screen } from "./entities/screen.entity";
import { Crud, CrudAuth, CrudController } from "@nestjsx/crud";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ScreenDto } from "./dto/screen.dto";
import { EditScreensGuard } from "./edit-screens.guard";
import { RequestUserDto } from "src/users/dto/request-user.dto";
import { CreateScreenDto } from "./dto/create-screen.dto";
import { UpdateScreenDto } from "./dto/update-screen.dto";

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags("screens")
@Crud({
  model: {
    type: ScreenDto,
  },
  dto: {
    create: CreateScreenDto,
    update: UpdateScreenDto,
  },
  params: {
    eventId: {
      type: "uuid",
      primary: false,
      field: "eventId",
    },
    id: {
      field: "id",
      type: "uuid",
      primary: true,
    },
  },
  query: {
    join: {
      event: {
        eager: true,
        select: false,
        required: true,
      },
    },
  },
  routes: {
    updateOneBase: {
      decorators: [UseGuards(EditScreensGuard)],
    },
    deleteOneBase: {
      decorators: [UseGuards(EditScreensGuard)],
    },
    replaceOneBase: {
      decorators: [UseGuards(EditScreensGuard)],
    },
  },
})
@CrudAuth({
  property: "user",
  filter: (user: RequestUserDto) => ({
    "event.userId": user.id,
  }),
})
@Controller("events/:eventId/screens")
export class ScreensController implements CrudController<Screen> {
  constructor(public service: ScreensService) {}
}
