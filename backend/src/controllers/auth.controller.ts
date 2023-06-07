import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUserDto } from "src/dtos";
import { AuthService } from "src/services";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/register")
  register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }
}
