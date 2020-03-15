import { IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  string: string;
}
