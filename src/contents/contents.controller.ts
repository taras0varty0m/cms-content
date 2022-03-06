import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Crud, CrudAuth, CrudController } from "@nestjsx/crud";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RequestUserDto } from "src/users/dto/request-user.dto";
import { ContentsService } from "./contents.service";
import { ContentDto } from "./dto/content.dto";
import { CreateContentDto } from "./dto/create-content.dto";
import { UpdateContentDto } from "./dto/update-content.dto";
import { EditContentsGuard } from "./edit-contents.guard";
import { Content } from "./entities/content.entity";

@Crud({
  model: {
    type: Content,
  },

  serialize: {
    create: CreateContentDto,
    update: UpdateContentDto,
    replace: UpdateContentDto,
    get: ContentDto,
  },

  params: {
    id: {
      field: "id",
      type: "uuid",
      primary: true,
    },
  },

  routes: {
    exclude: ["recoverOneBase"],
    replaceOneBase: {
      decorators: [UseGuards(EditContentsGuard)],
    },
    deleteOneBase: {
      decorators: [UseGuards(EditContentsGuard)],
    },
  },
})
@CrudAuth({
  property: "user",
  persist: (user: RequestUserDto) => ({
    userId: user.id,
    href: `${Math.random() * 1e10}`,
  }),
})
@ApiTags("contents")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("contents")
export class ContentsController implements CrudController<Content> {
  constructor(public service: ContentsService) {}
}
