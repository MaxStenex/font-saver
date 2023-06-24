import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { RegisterUserDto } from "src/dtos";
import { UserService } from "src/services";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post("/create")
  register(@Body() dto: RegisterUserDto) {
    return this.userService.register(dto);
  }
}
