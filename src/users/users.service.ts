import { Injectable } from "@nestjs/common";

import { User } from "./entities/user.entity";
import { UsersRepository } from "./users.repository";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(usersRepository: UsersRepository) {
    super(usersRepository);
  }
}
