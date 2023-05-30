import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @MinLength(2)
  @MaxLength(64)
  @IsNotEmpty()
  username: string;

  @MinLength(6)
  @MaxLength(64)
  @IsNotEmpty()
  password: string;
}
