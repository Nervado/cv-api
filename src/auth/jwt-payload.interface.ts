import { User } from 'src/users/models/user.entity';

export interface JwtPayload {
  user: User;
}
