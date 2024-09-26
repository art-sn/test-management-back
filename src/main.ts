import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  const originConfig = [
    'http://localhost:8000',
    'http://localhost:3000',
    'http://localhost:5173',
  ];
  app.enableCors({
    allowedHeaders: ['content-type', 'authorization', 'service-token'],
    origin: originConfig,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: false,
      whitelist: true,
    }),
  );

  await app.listen(3001);
}

bootstrap();
