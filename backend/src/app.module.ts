import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule, UserModule } from "./modules";
import { configService } from "./config";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./guards";

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
  ],
  controllers: [],
})
export class AppModule {}
