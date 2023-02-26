import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigModule } from '@nestjs/config';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import { LoggerService } from './logger/logger.service';
ConfigModule.forRoot();

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.enableCors();

  const swaggerFile = await readFile('doc/api.yaml', 'utf-8');
  const openAPIObject = parse(swaggerFile);
  SwaggerModule.setup('swagger', app, openAPIObject);

  await app.listen(PORT);

  process.on('uncaughtException', (e) => {
    console.error(`uncaughtException: ${e}`);
    process.exit(1);
  });

  process.on('unhandledRejection', (e) => {
    console.error(`unhandledRejection: ${e}`);
  });
}
bootstrap().then();
