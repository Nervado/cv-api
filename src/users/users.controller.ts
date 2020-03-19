import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  ValidationPipe,
  Logger,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PageFilterDto } from './dto/page-filter.dto';
import { User } from './models/user.entity';

@Controller('users')
export class UsersController {
  private logger = new Logger('UsersController');

  constructor(private usersService: UsersService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getUsers(
    @Query(ValidationPipe) pageFilterDto: PageFilterDto,
  ): Promise<User[]> {
    this.logger.verbose(`User "${1212}" retrieving all users`);
    return this.usersService.index(pageFilterDto);
  }

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.get(id);
  }
}
