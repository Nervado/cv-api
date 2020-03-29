import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { EmailDto } from './dto/email.dto';
import { EmailsService } from './emails.service';
import { EmailTypeValidationPipe } from './pipes/email-type-validation.pipe';

@Controller('emails') // public route
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}
  @Post()
  @UsePipes(EmailTypeValidationPipe)
  sendEmail(@Body(ValidationPipe) body: EmailDto): void {
    this.emailsService.sendEmail(body);
  }
}
