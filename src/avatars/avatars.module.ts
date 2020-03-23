import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AvatarRepository } from './avatar.repository';
import { AvatarsController } from './avatars.controller';
import { AvatarsService } from './avatars.service';
import { UsersService } from 'src/users/users.service';
import { UserRepository } from 'src/users/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AvatarRepository])],
  controllers: [AvatarsController],
  providers: [AvatarsService, UsersService, UserRepository],
})
export class AvatarsModule {}
