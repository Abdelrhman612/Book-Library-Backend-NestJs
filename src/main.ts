import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { hostname } from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  });

  app.setGlobalPrefix('api');
  const port = process.env.PORT ?? 5000;
  await app.listen(port, hostname ? hostname() : '0.0.0.0');
}
void bootstrap();
