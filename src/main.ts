import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      transform:true,
      forbidNonWhitelisted:true
    }),
  );

  const configService = app.get(ConfigService);

  const corsOptions = configService.get('security.cors');
  app.enableCors({
    origin: corsOptions?.origins || '*', // allow all origins by default or from config
    methods: corsOptions?.methods || 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders:
      corsOptions?.allowedHeaders || 'Content-Type, Authorization',
  });

  app.setGlobalPrefix('api');

  const SwaggerConfig = new DocumentBuilder()
    .setTitle("API Documentation")
    .build();

  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup('api/docs', app, document);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const port = configService.get<number>('app.port');
  await app.listen(port ?? 8000);
}
bootstrap();
