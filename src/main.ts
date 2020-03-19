import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from './services/config.service';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const serverConfig = new ConfigService();

  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: serverConfig.getOrigin() });
    logger.log(`Accepting requests from origin "${serverConfig.getOrigin()}"`);
  }

  await app.listen(serverConfig.getHttpPort());
  logger.log(`listening on port "${serverConfig.getHttpPort()}"`);
}
bootstrap();
