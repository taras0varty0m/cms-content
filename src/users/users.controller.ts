import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { UsersService } from "./users.service";
import { SignUpUserDto } from "./dto/sign-up.dto";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserParam } from "./user.decorator";
import { AuthService } from "src/auth/auth.service";
import { AuthGuard } from "@nestjs/passport";
import { AuthLoginDto } from "src/auth/dto/sign-in.dto";
import { Crud, CrudController } from "@nestjsx/crud";
import { User } from "./entities/user.entity";
import { EditUsersGuard } from "./edit-users.guard";
import { ResponseUserDto } from "./dto/response-user";

@ApiTags("users")
@Crud({
  model: {
    type: User,
  },
  serialize: {
    update: UpdateUserDto,
  },
  params: {
    id: {
      field: "id",
      type: "uuid",
      primary: true,
    },
  },
  routes: {
    only: ["getOneBase", "updateOneBase", "deleteOneBase", "getManyBase"],
    updateOneBase: {
      decorators: [UseGuards(JwtAuthGuard, EditUsersGuard), ApiBearerAuth()],
    },
    deleteOneBase: {
      decorators: [UseGuards(JwtAuthGuard, EditUsersGuard), ApiBearerAuth()],
    },
  },
})
@Controller("users")
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService, public authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @ApiBody({ type: AuthLoginDto })
  @Post("login")
  login(@UserParam() user) {
    return this.authService.login(user);
  }

  @Post("register")
  register(@Body() createUserDto: SignUpUserDto) {
    return this.service.register(createUserDto);
  }
}
