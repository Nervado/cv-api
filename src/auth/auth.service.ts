import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../users/user.repository';
import { AuthSingUpDto } from './dto/auth-signup.dto';
import { AuthLoginCredentialsDto } from './dto/auth-login.dto';
import { JwtPayload } from './jwt-payload.interface';
import { AuthCredentailsDto } from './dto/auth-credentials';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authSingUpDto: AuthSingUpDto): Promise<void> {
    return this.userRepository.signUp(authSingUpDto);
  }

  async signIn(
    authLoginCredentialsDto: AuthLoginCredentialsDto,
  ): Promise<AuthCredentailsDto> {
    const user = await this.userRepository.validateUserPassword(
      authLoginCredentialsDto,
    );

    const { userId } = user;

    if (!userId) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { userId };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );

    const authCredentailsDto = new AuthCredentailsDto();

    authCredentailsDto.token = accessToken;
    authCredentailsDto.user = user;

    return authCredentailsDto;
  }
}
