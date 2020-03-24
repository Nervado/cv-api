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
  Put,
  Body,
  UseGuards,
  // UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PageFilterDto } from './dto/page-filter.dto';
import { User } from './models/user.entity';
import { UserUpdateDto } from './dto/user-update.dto';
import { GetUser } from 'src/auth/get-user.decorator';

//import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

//import { AuthGuard } from '../auth/auth.guard';
// import { RolesGuard } from '../auth/roles.guard';

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

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  getUser(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    this.logger.verbose(`User ${user.userId} attempt to get profile data...`);
    return this.usersService.get(id);
  }

  @Put('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UserUpdateDto,
  ): Promise<User> {
    return this.usersService.update(id, body);
  }
}
