import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as K from "./shared/consts";
import * as basicAuth from "express-basic-auth";

async function bootstrap() {
  const logger = new Logger("main");
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT");
  const host = configService.get<string>("HOST");
  const env = configService.get<string>("ENV");
  const swaggerUsername = configService.get<string>(
    "SWAGGER_BASIC_AUTH_USERNAME",
  );
  const swaggerPassword = configService.get<string>(
    "SWAGGER_BASIC_AUTH_PASSWORD",
  );

  const config = new DocumentBuilder()
    .setTitle("Chatster APIs")
    .setDescription("Chaster API collection")
    .setVersion("1.0")
    .addTag("example-tag")
    .build();

  const swaggerEndpointWildcard =
    "/" + K.API_CONSTANTS.SWAGGER_API_ENDPOINT + "*";
  app.use(
    swaggerEndpointWildcard,
    basicAuth({
      challenge: true,
      users: { [swaggerUsername]: swaggerPassword },
    }),
  );
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(K.API_CONSTANTS.SWAGGER_API_ENDPOINT, app, document);

  await app.listen(port);
  logger.log(`Server up and running on ${env} env at ${host}:${port}`);
}
bootstrap();
