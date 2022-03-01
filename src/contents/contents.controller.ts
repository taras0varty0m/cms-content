import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ContentsService } from "./contents.service";
import { CreateEventScreenContentGuard } from "./create-event-screen-playlist-content.guard";
import { ContentDto } from "./dto/content.dto";
import { CreateContentDto } from "./dto/create-content.dto";
import { UpdateContentDto } from "./dto/update-content.dto";
import { EditContentsGuard } from "./edit-contents.guard";
import { Content } from "./entities/content.entity";

@Crud({
  model: {
    type: ContentDto,
  },

  dto: {
    create: CreateContentDto,
    replace: UpdateContentDto,
  },

  params: {
    id: {
      field: "id",
      type: "uuid",
      primary: true,
    },
    userId: {
      type: "uuid",
      primary: false,
      field: "userId",
    },
  },

  routes: {
    exclude: ["createManyBase", "recoverOneBase", "updateOneBase"],
    createOneBase: {
      decorators: [UseGuards(CreateEventScreenContentGuard)],
    },
    replaceOneBase: {
      decorators: [UseGuards(EditContentsGuard)],
    },
    deleteOneBase: {
      decorators: [UseGuards(EditContentsGuard)],
    },
  },
})
@ApiTags("contents")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("users/:userId/contents")
export class ContentsController implements CrudController<Content> {
  constructor(public service: ContentsService) {}
}
