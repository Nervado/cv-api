import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

import { EmailJob } from './jobs/send-email.job';

@Injectable()
export class EmailsService {
  private readonly logger = new Logger();
  constructor(@InjectQueue('email') private emailQueue: Queue) {}

  sendEmail(data: any): boolean {
    this.logger.verbose(data);

    const emailJob = new EmailJob(
      'subscribeEmail',
      { data: { ...data }, date: new Date() },
      { delay: 200 },
    );

    const queed = this.emailQueue.add(
      emailJob.name,
      emailJob.data,
      emailJob.opts,
    );
    this.logger.verbose('Add to queue...');

    return queed ? true : false;
  }
}
