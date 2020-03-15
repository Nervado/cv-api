import { Controller, Post, Get, Param, ParseIntPipe } from '@nestjs/common';

// import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  @Post()
  createUser(): string {
    return 'user created';
  }
  @Get()
  getUsers() {
    return [{ id: 1, name: 'jose' }];
  }
  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return { id, name: 'jose' };
  }
}
