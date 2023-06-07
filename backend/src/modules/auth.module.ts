import { Module } from "@nestjs/common";
import { AuthController } from "src/controllers";
import { AuthService } from "src/services";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
