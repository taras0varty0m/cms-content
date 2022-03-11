import { Injectable } from "@nestjs/common";

import { UsersRepository } from "src/users/users.repository";
@Injectable()
export class AuthService {
  constructor(private userRepository: UsersRepository) {}

  async validateByEmail(email: string) {
    let user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      user = this.userRepository.create({
        email,
      });

      await this.userRepository.save(user);
    }

    return user;
  }
}
