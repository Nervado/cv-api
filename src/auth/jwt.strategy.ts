import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../users/user.repository';
import { configService } from '../services/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getJwtConfig().secret,
    });
  }

  async validate(payload: JwtPayload): Promise<boolean> {
    const { user } = payload;

    // check is expired token
    const date = new Date().getTime();
    const isExpired = Object.values(payload)[2] > date ? true : false;

    if (isExpired) {
      throw new UnauthorizedException('Expired credentials!');
    }

    // check if has a valid user in token
    if (!user) {
      throw new UnauthorizedException('Corrupted credentials!');
    }

    // check if email existis
    const { email } = user;
    const user_ = await this.userRepository.findOne({ where: { email } });

    if (!user_ || email !== user_.email) {
      throw new UnauthorizedException('Invalid credentials!');
    } else {
      return true;
    }
  }
}
