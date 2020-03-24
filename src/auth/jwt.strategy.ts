import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { configService } from '../services/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getJwtConfig().secret,
    });
  }

  async validate(payload: any) {
    // Add logic to provid acess or not
    //if (payload.userId !== 30) {
    //throw new UnauthorizedException('Apenas o usuario 30 pode fazer isso ');
    //}
    return { userId: payload.userId, username: payload.username };
  }
}

/*


import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { configService } from '../services/config.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth-login.dto';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './jwt-payload.interface';
import { User } from 'src/users/models/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getJwtConfig().secret,
    });
  }

  async validate(payload: any): Promise<User> {
    console.log('user');
    const { userId } = payload;
    const user = await this.usersService.get(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
    /** 
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

    const user_ = await this.authService.validateUser(user);
    console.log('Este usuario', user_);

    if (!user_ || email !== user_.email) {
      throw new UnauthorizedException('Invalid credentials!');
    } else {
      return true;
    }
  }


  }
}
*/
