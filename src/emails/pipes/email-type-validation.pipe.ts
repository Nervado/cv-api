import { PipeTransform, BadRequestException } from '@nestjs/common';
import { EmailType } from '../enums/email-type';

export class EmailTypeValidationPipe implements PipeTransform {
  readonly allowedTypes = [
    EmailType.BUDGETS,
    EmailType.COMPLAINT,
    EmailType.FINANCIAL,
    EmailType.GENERAL,
  ];

  transform(value: any) {
    const data = value;
    value = value.type.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid type`);
    }
    data.type = value;

    return data;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedTypes.indexOf(status);
    return idx !== -1;
  }
}
