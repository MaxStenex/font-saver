import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  Res,
  UseInterceptors,
} from "@nestjs/common";
import { Request, Response } from "express";
import { LoginDto } from "src/dtos/login.dto";
import { Public } from "src/guards";
import { AuthService } from "src/services";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post("/login")
  login(@Res({ passthrough: true }) response: Response, @Body() dto: LoginDto) {
    return this.authService.login({ ...dto, response });
  }

  @Post("/logout")
  logout(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    return this.authService.logout({
      response,
      refreshToken: request.cookies[this.authService.refreshTokenCookieName],
    });
  }

  @Public()
  @Post("/refresh-tokens")
  refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.refreshTokens({
      refreshToken: request.cookies[this.authService.refreshTokenCookieName],
      response,
    });
  }
}
