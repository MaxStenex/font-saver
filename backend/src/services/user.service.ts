import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { RegisterUserDto } from "src/dtos";
import { User } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async register({ email, password, username }: RegisterUserDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      username,
    });
    await this.userRepository.save(user);

    return {
      status: HttpStatus.OK,
      message: "User registered successfully",
    };
  }
}
