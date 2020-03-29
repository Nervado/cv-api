import {
  IsNotEmpty,
  IsString,
  Length,
  IsEmail,
  IsPhoneNumber,
  IsIn,
} from 'class-validator';

import { EmailType } from '../enums/email-type';

export class EmailDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 150)
  username: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('BR')
  phonenumber: string;

  @IsIn([
    EmailType.BUDGETS,
    EmailType.FINANCIAL,
    EmailType.GENERAL,
    EmailType.COMPLAINT,
  ])
  type: EmailType;

  @IsNotEmpty()
  @IsString()
  @Length(10, 150)
  msg: string;
}
