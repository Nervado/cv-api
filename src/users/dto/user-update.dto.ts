import { AvatarDto } from 'src/avatars/dto/avatar.dto';

export class UserUpdateDto {
  username?: string;
  surname?: string;
  street?: string;
  cpf?: string;
  phonenumber?: string;
  email?: string;
  housenumber?: string;
  complement?: string;
  neibehoord?: string;
  city?: string;
  uf?: string;
  cep?: string;
  avatar?: AvatarDto;
}
