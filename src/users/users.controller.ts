import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getAll();
  }
  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return { id, name: 'jose' };
  }
}
