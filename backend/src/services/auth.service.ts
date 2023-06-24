import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginDto } from "src/dtos/login.dto";
import { User } from "src/entities";
import { UserJwtPayload } from "src/types/user";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async generateAccessToken(payload: UserJwtPayload) {
    return this.jwtService.sign(payload);
  }

  async generateRefreshToken(payload: UserJwtPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: "7d",
    });
  }

  async validateAccessToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async login({ email, password }: LoginDto) {
    try {
      const user = await this.userRepository.findOneByOrFail({
        email,
      });

      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}