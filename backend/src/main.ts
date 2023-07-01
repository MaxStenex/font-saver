import { ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { QueryErrorFilter } from "./filters";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new QueryErrorFilter(httpAdapter));
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
  });

  await app.listen(8000);
}
bootstrap();
