import { UserDto } from 'src/users/dto/user-dto';
import { PhotoDto } from 'src/photos/dto/photo.dto';
import { AddressDto } from 'src/address/dto/adress.dto';

import { IsString, IsNumber } from 'class-validator';

export class BudgetDto {
  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsString()
  description: string;

  @IsNumber()
  height: number;

  @IsNumber()
  widht: number;

  @IsNumber()
  deepness: number;

  @IsNumber()
  numberOfRooms: number;

  @IsNumber()
  numberOflights: number;

  @IsNumber()
  numberOfWalls: number;

  @IsNumber()
  numberOfFloors: number;

  @IsNumber()
  numberOfDoors: number;

  @IsNumber()
  numberOfWindows: number;

  @IsNumber()
  desirableTime: number;

  user?: {
    username: string;
    email: string;
    surname: string;
    phoneNumber: string;
  };

  photo?: PhotoDto[];

  address: AddressDto;
}
