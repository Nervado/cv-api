import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsModule } from './notifications/notifications.module';
import { configService } from './services/config.service';
import { MongoOptions } from './config/mongo.config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AvatarsModule } from './avatars/avatars.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(configService.getTypeORMConfig()),
    MongooseModule.forRoot(configService.getMongoConfig(), MongoOptions),
    NotificationsModule,
    AuthModule,

    AvatarsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
