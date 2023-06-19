import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  NotImplementedException,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { RegisterUserDto } from "src/dtos";
import { LoginDto } from "src/dtos/login.dto";
import { AuthService } from "src/services";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post("/register")
  register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post("/login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post("/refresh-tokens")
  refreshTokens() {
    throw new NotImplementedException();
  }
}
