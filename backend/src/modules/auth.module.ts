import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "src/controllers";
import { RefreshSession, User } from "src/entities";
import { AuthService } from "src/services";
import { configService } from "src/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, RefreshSession]),
    JwtModule.register({
      secret: configService.getJwtSecretKey(),
      signOptions: {
        expiresIn: configService.getAccessTokenExpiresInMs() / 1000,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
