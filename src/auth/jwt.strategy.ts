import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    if (!user) {
      console.log('aqui');
      //return false;
      throw new UnauthorizedException('Corrupted credentials!');
    }
    const { email } = user;

    const user_ = await this.userRepository.findOne({ where: { email } });

    if (!user_ || email !== user_.email) {
      //return false;
      throw new UnauthorizedException('Invalid credentials!');
    } else {
      console.log('Payload checked!');
      return true;
    }
  }
}
