import { Injectable, UnauthorizedException } from "@nestjs/common";
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

  refreshTokenCookieName = "refreshToken";

  async generateAccessToken(payload: UserJwtPayload) {
    return this.jwtService.sign(payload);
  }

  async generateRefreshSession({ user }: { user: User }) {
    const refreshToken = uuidv4();

    const refreshSession = this.refreshSessionRepository.create({
      refreshToken,
      user,
      expiresIn: String(
        new Date().getTime() + configService.getRefreshTokenExpiresInMs(),
      ),
    });

    await this.refreshSessionRepository.save(refreshSession);

    return refreshSession;
  }

  validateAccessToken(token: string): boolean {
    try {
      this.jwtService.verify<UserJwtPayload>(token);

      return true;
    } catch (error) {
      return false;
    }
  }

  private getRefreshTokenCookieSettings(expiresIn: string) {
    return {
      httpOnly: true,
      expires: new Date(Number(expiresIn)),
      path: "/auth",
    };
  }

  private setRefreshTokenInCookies({
    refreshSession,
    response,
  }: {
    refreshSession: RefreshSession;
    response: Response;
  }) {
    response.cookie(
      this.refreshTokenCookieName,
      refreshSession.refreshToken,
      this.getRefreshTokenCookieSettings(refreshSession.expiresIn),
    );
  }

  async login({
    email,
    password,
    response,
  }: LoginDto & { response: Response }) {
    const invalidCredsError = new UnauthorizedException(
      "Invalid email or password",
    );

    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) throw invalidCredsError;

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw invalidCredsError;

    const refreshSession = await this.generateRefreshSession({ user });
    const accessToken = await this.generateAccessToken({ id: user.id });
    this.setRefreshTokenInCookies({ refreshSession, response });

    return { accessToken };
  }

  async refreshTokens({
    refreshToken,
    response,
  }: {
    refreshToken: string;
    response: Response;
  }) {
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token not provided");
    }

    const oldRefreshSession = await this.refreshSessionRepository.findOne({
      where: { refreshToken },
      relations: ["user"],
    });
    if (!oldRefreshSession) {
      throw new UnauthorizedException("Session not found");
    }

    await this.refreshSessionRepository.remove(oldRefreshSession);
    if (Number(oldRefreshSession.expiresIn) < new Date().getTime()) {
      throw new UnauthorizedException("Session is expired");
    }

    const user = await this.userRepository.findOneBy({
      id: oldRefreshSession.user.id,
    });
    if (!user) throw new UnauthorizedException("User not found");

    const newRefreshSession = await this.generateRefreshSession({ user });
    const accessToken = await this.generateAccessToken({ id: user.id });
    this.setRefreshTokenInCookies({
      refreshSession: newRefreshSession,
      response,
    });

    return { accessToken };
  }

  async logout({
    response,
    refreshToken,
  }: {
    response: Response;
    refreshToken: string;
  }) {
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token not provided");
    }

    const refreshSession = await this.refreshSessionRepository.findOne({
      where: { refreshToken },
    });
    if (!refreshSession) {
      throw new UnauthorizedException("Refresh session not found");
    }

    response.clearCookie(
      this.refreshTokenCookieName,
      this.getRefreshTokenCookieSettings(refreshSession.expiresIn),
    );
    await this.refreshSessionRepository.remove(refreshSession);
  }
}
