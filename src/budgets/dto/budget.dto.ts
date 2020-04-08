import { AuthSingUpDto } from '../../auth/dto/auth-signup.dto';
import { PhotoDto } from 'src/photos/dto/photo.dto';
import { AddressDto } from 'src/address/dto/adress.dto';

import {
  IsString,
  IsNumber,
  IsNotEmpty,
  ValidateNested,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class BudgetDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNumber()
  @IsOptional()
  height: number;

  @IsNumber()
  @IsOptional()
  width: number;

  @IsNumber()
  @IsOptional()
  deepness: number;

  @IsNumber()
  @IsOptional()
  numberOfRooms: number;

  @IsNumber()
  @IsOptional()
  numberOflights: number;

  @IsNumber()
  @IsOptional()
  numberOfWalls: number;

  @IsNumber()
  @IsOptional()
  numberOfFloors: number;

  @IsNumber()
  @IsOptional()
  numberOfDoors: number;

  @IsNumber()
  @IsOptional()
  numberOfWindows: number;

  @IsNotEmpty()
  @IsDateString()
  desirableTime: Date;

  @ValidateNested()
  user: AuthSingUpDto;

  photo: PhotoDto[];
  @ValidateNested()
  address: AddressDto;
}
