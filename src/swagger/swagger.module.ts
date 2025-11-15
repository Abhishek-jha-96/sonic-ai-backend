import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig, SWAGGER_PATH } from './swagger.config';

export class SwaggerSetup {
  static init(app: INestApplication) {
    const document = SwaggerModule.createDocument(app, swaggerConfig, {
      deepScanRoutes: true,
    });

    SwaggerModule.setup(SWAGGER_PATH, app, document, {
      swaggerOptions: { persistAuthorization: true },
      customSiteTitle: 'API Docs',
    });

  }
}
