import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { configService } from './config/config.service';
import { MongoOptions } from './config/mongo.config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuthModule } from './auth/auth.module';
import { AvatarsModule } from './avatars/avatars.module';
import { SchedulesModule } from './schedules/schedules.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeORMConfig()),
    MongooseModule.forRoot(configService.getMongoConfig(), MongoOptions),
    UsersModule,
    NotificationsModule,
    AuthModule,
    AvatarsModule,
    SchedulesModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
