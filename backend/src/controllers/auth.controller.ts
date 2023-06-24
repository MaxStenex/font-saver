import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  NotImplementedException,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { LoginDto } from "src/dtos/login.dto";
import { AuthService } from "src/services";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post("/login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post("/logout")
  logout() {
    throw new NotImplementedException();
  }

  @Post("/refresh-tokens")
  refreshTokens() {
    throw new NotImplementedException();
  }
}
