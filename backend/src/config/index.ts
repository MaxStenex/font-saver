import * as dotenv from "dotenv";
import { DataSourceOptions } from "typeorm";
import ms from "ms";

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

  public getJwtSecretKey() {
    return this.getValue("JWT_SECRET");
  }

  public getRefreshTokenExpiresInMs(): number {
    const value = ms(this.getValue("REFRESH_TOKEN_EXPIRES_IN_MS"));
    if (typeof value !== "number") {
      throw new Error("REFRESH_TOKEN_EXPIRES_IN provides invalid value");
    }

    return value;
  }

  public getTypeOrmConfig(): DataSourceOptions {
    return {
      type: "postgres",

      host: this.getValue("DB_HOST"),
      port: parseInt(this.getValue("DB_PORT")),
      username: this.getValue("DB_USERNAME"),
      password: this.getValue("DB_PASSWORD"),
      database: this.getValue("DB_NAME"),

      entities: ["dist/entities/**/*.js"],
      migrations: ["dist/migration/**/*.js"],

      migrationsTableName: "migration",
      logging: true,
    };
  }
}

export const configService = new ConfigService(process.env);
