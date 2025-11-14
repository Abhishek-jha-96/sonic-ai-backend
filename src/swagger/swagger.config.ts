import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('API Docs')
  .setDescription('REST API documentation')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();

export const SWAGGER_PATH = 'docs';
