/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
    
  }));
  app.use(cookieParser());
  app.setGlobalPrefix('api/v1')
  const port = process.env.PROJEC_PORT
  await app.listen(port, ()=>{
    console.log(`server running on port:${port}`);
  });
}
bootstrap();



