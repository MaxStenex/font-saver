import { Injectable } from "@nestjs/common";
import { RegisterUserDto } from "src/dtos/register-user.dto";

@Injectable()
export class AuthService {
  async register(dto: RegisterUserDto) {
    return `new user registered : ${JSON.stringify(dto)}`;
  }
}
