import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { getCorsOptions } from './config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(getCorsOptions(app.get(ConfigService)));
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('RestaurantWebsite API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  await app.listen(8080);
}
bootstrap();
