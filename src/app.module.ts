import { Module } from '@nestjs/common';
// import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

import { configService } from './services/config.service';
import { MongoOptions } from './config/mongo.config';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuthModule } from './auth/auth.module';
import { AvatarsModule } from './avatars/avatars.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeORMConfig()),
    MongooseModule.forRoot(configService.getMongoConfig(), MongoOptions),
    UsersModule,
    NotificationsModule,
    AuthModule,
    AvatarsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
