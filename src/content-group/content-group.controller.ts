import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Crud, CrudAuth, CrudController } from "@nestjsx/crud";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RequestUserDto } from "src/users/dto/request-user.dto";
import { ContentGroupService } from "./content-group.service";
import { ContentGroupDto } from "./dto/content-group.dto";
import { CreateContentGroupDto } from "./dto/create-content-group.dto";
import { UpdateContentGroupDto } from "./dto/update-content-group.dto";
import { EditContentGroupGuard } from "./edit-content-group.guard";
import { ContentGroup } from "./entities/content-group.entity";

@Crud({
  model: {
    type: ContentGroup,
  },

  serialize: {
    create: CreateContentGroupDto,
    update: UpdateContentGroupDto,
    replace: UpdateContentGroupDto,
    get: ContentGroupDto,
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
      decorators: [UseGuards(EditContentGroupGuard)],
    },
    deleteOneBase: {
      decorators: [UseGuards(EditContentGroupGuard)],
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
@ApiTags("content-group")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("content-group")
export class ContentGroupController implements CrudController<ContentGroup> {
  constructor(public service: ContentGroupService) {}
}
