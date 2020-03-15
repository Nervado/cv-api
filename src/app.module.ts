import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import ConfigModule from './config/config.module';

import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    MongooseModule.forRoot('mongodb://localhost/cv_reformas'),
    NotificationsModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
