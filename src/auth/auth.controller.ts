import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthSingUpDto } from './dto/auth-signup.dto';
import { AuthService } from './auth.service';
import { AuthLoginCredentialsDto } from './dto/auth-login.dto';
import { AuthCredentailsDto } from './dto/auth-credentials';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authSingUpDto: AuthSingUpDto): Promise<void> {
    return this.authService.signUp(authSingUpDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authLoginCredentialsDto: AuthLoginCredentialsDto,
  ): Promise<AuthCredentailsDto> {
    return this.authService.signIn(authLoginCredentialsDto);
  }
}
