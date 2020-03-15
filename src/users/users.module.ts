import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
})
export class UsersModule {
  constructor(private readonly userService: UsersService) {}
  createUser() {
    return 'usuário criado';
  }
}
