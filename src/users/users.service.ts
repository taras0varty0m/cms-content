import { ConflictException, Injectable } from "@nestjs/common";

import { User } from "./entities/user.entity";
import { UsersRepository } from "./users.repository";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { ResponseUserDto } from "./dto/response-user";
import { SignUpUserDto } from "./dto/sign-up.dto";

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(private usersRepository: UsersRepository) {
    super(usersRepository);
  }

  async register(createUserDto: SignUpUserDto): Promise<ResponseUserDto> {
    if (await this.usersRepository.findOne({ email: createUserDto.email })) {
      throw new ConflictException("User already exist");
    }
    const user = User.create(createUserDto);
    return await user.save();
  }
}
