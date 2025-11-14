import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerSetup } from './swagger/swagger.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerSetup.init(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
