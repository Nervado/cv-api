import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { configService } from './services/config.service';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: configService.getOrigin() });
    logger.log(`Accepting requests from origin "${configService.getOrigin()}"`);
  }

  await app.listen(configService.getHttpPort());
  logger.log(`listening on port "${configService.getHttpPort()}"`);
}
bootstrap();
