import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { LoginDto } from "src/dtos/login.dto";
import { RefreshSession, User } from "src/entities";
import { UserJwtPayload } from "src/types/user";
import { Repository } from "typeorm";
import { configService } from "src/config";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(RefreshSession)
    private refreshSessionRepository: Repository<RefreshSession>,
    private jwtService: JwtService,
  ) {}

  async generateAccessToken(payload: UserJwtPayload) {
    return this.jwtService.sign(payload);
  }

  async generateRefreshToken({ user }: { user: User }) {
    const refreshToken = uuidv4();

    const refreshSession = this.refreshSessionRepository.create({
      refreshToken,
      user,
      expiresIn:
        new Date().getTime() + configService.getRefreshTokenExpiresInMs(),
    });

    await this.refreshSessionRepository.save(refreshSession);

    return refreshSession.refreshToken;
  }

  async validateAccessToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async login({
    email,
    password,
    response,
  }: LoginDto & { response: Response }) {
    try {
      const invalidCredsError = new UnauthorizedException(
        "Invalid email or password",
      );

      const user = await this.userRepository.findOneByOrFail({
        email,
      });
      if (!user) return invalidCredsError;

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) return invalidCredsError;

      const refreshToken = await this.generateRefreshToken({ user });
      const accessToken = await this.generateAccessToken({ id: user.id });
      response.cookie("refreshToken", refreshToken);

      return { accessToken };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
