import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private jwtStrategy: JwtStrategy,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const autHeader = context.switchToHttp().getRequest().headers.authorization;

    if (!autHeader) {
      throw new UnauthorizedException('Not credentials provided 407!');
    } else {
      const [, token] = autHeader.split(' ');
      const result = this.authService
        .validateToken(token)
        .then(data => {
          const { user } = data;
          context.switchToHttp().getRequest().user = user;
          return this.jwtStrategy.validate(data);
        })
        .catch(() => {
          throw new UnauthorizedException('Invalid credentials 401!');
        });
      return result && result;
    }
  }
}
