import { UserDto } from '../../users/dto/user-dto';

export class AuthCredentailsDto {
  user: UserDto;
  token: string;
}
