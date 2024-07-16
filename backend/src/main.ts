import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Serve static files from the Angular app
  app.use(express.static(join(__dirname, '..', 'public')));
  // API routes
  app.setGlobalPrefix('api');
  // CORS configuration (if needed)
  app.enableCors();

  await app.listen(3000);
}
bootstrap();