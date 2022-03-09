import { ResponseUserDto } from "../../users/dto/response-user";

export class LoginUserDto {
  user: ResponseUserDto;
  access_token: string;
}
