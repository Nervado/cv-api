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
import { EmailsModule } from './emails/emails.module';
import { DocsModule } from './docs/docs.module';
import { BudgetsModule } from './budgets/budgets.module';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeORMConfig()),
    MongooseModule.forRoot(configService.getMongoConfig(), MongoOptions),
    UsersModule,
    NotificationsModule,
    AuthModule,
    AvatarsModule,
    SchedulesModule,
    EmailsModule,
    DocsModule,
    BudgetsModule,
    PhotosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
