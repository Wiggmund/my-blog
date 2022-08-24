import { NestFactory, Reflector } from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
	origin: true,
	credentials: true
  }); 
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Blog')
    .setDescription('API for simple Blog')
    .setVersion('1.0.0')
    .addTag('Blog')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();
