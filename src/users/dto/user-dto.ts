// import { Avatar } from 'src/avatars/models/avatar.entity';

export class UserDto {
  userId?: number;
  username: string;
  surname: string;
  street: string;
  cpf: string;
  phonenumber: string;
  email: string;
  housenumber: string;
  complement: string;
  neibehoord: string;
  city: string;
  uf: string;
  cep: string;
  admin: boolean;
  ispro: boolean;
}
