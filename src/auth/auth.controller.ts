import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthSingUpDto } from './dto/auth-signup.dto';
import { AuthService } from './auth.service';

import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/auth-login.dto';
import { CredentailsDto } from './dto/auth-credentials.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authSingUpDto: AuthSingUpDto): Promise<void> {
    return this.authService.signUp(authSingUpDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/signin')
  signIn(@Body(ValidationPipe) loginDto: LoginDto): Promise<CredentailsDto> {
    return this.authService.signIn(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/test')
  test(@Req() req): string {
    console.log(req.user);
    return 'Este é o problema ou era';
  }
}
