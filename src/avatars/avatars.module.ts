import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvatarRepository } from './avatar.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AvatarRepository])],
})
export class AvatarsModule {}
