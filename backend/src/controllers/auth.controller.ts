import {
  Body,
  Controller,
  NotImplementedException,
  Post,
} from "@nestjs/common";
import { RegisterUserDto } from "src/dtos";
import { LoginDto } from "src/dtos/login.dto";
import { AuthService } from "src/services";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/register")
  register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  @Post("/login")
  login(@Body() dto: LoginDto) {
    throw new NotImplementedException();
  }

  @Post("/refresh-tokens")
  refreshTokens() {
    throw new NotImplementedException();
  }
}
