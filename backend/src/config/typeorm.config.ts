import { DataSource } from "typeorm";
import { configService } from "./";

export const TypeOrmDataSource = new DataSource({
  ...configService.getTypeOrmConfig(),
});
