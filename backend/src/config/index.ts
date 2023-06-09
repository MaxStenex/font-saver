import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";

dotenv.config();

class ConfigService {
  constructor(private env: { [key: string]: string | undefined }) {}

  private getValue(key: string): string {
    const value = this.env[key];
    if (!value) {
      throw new Error(`env.${key} value is not provided`);
    }

    return value;
  }

  public getPort() {
    return this.getValue("PORT");
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: "postgres",

      host: this.getValue("DB_HOST"),
      port: parseInt(this.getValue("DB_PORT")),
      username: this.getValue("DB_USERNAME"),
      password: this.getValue("DB_PASSWORD"),
      database: this.getValue("DB_NAME"),

      entities: ["*.entity{.ts,.js}"],

      migrationsTableName: "migration",

      migrations: ["src/migration/*.ts"],
    };
  }
}

export const configService = new ConfigService(process.env);
