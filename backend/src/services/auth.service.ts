import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { RegisterUserDto } from "src/dtos";
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

  async register({ email, password, username }: RegisterUserDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      username,
    });
    await this.userRepository.save(user);
    delete user.password;

    return user;
  }
}
