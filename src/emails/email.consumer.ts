import { Processor, Process, OnQueueActive } from '@nestjs/bull';
import { MailerService } from '@nestjs-modules/mailer';
import { Job } from 'bull';
import { jobStatus } from './enums/job-status';
import { Logger } from '@nestjs/common';

@Processor('email')
export class EmailConsumer {
  // method to process emails
  private readonly logger = new Logger(EmailConsumer.name);

  constructor(private readonly mailerService: MailerService) {}

  @Process('subscribeEmail')
  handleTranscode(job: Job) {
    // this.logger.debug('Start transcoding...');
    // this.logger.debug(job.data);
    this.example();
    // this.logger.debug('Transcoding completed');
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${{
        ...job.data,
      }}...${job.finished ? jobStatus.DONE : jobStatus.UNDONE}`,
    );
  }

  public example(): void {
    this.mailerService
      .sendMail({
        to: 'cvreformas@cvreformas.com.br', // list of receivers
        from: '<no-reply> system@cv.reformas.com.br', // sender address
        subject: 'Novo cliente', // Subject line
        template: 'test', // The `.pug` or `.hbs` extension is appended automatically.

        context: {
          // Data to be sent to template engine.
          admin: 'Evandro',
          email: 'evandro@test.com',
          name: 'John Forest Gump',
          date: '4 de maio de 2020',
          code: 'cf1a3f828287',
          username: 'john doe',
          provider: 'Marriel. C.',
          project: 'Reforma de sobrado',
          ratting: '4.7 stars',
        },
      })
      .then(resp => {
        this.logger.verbose(resp);
      })
      .catch(error => {
        this.logger.error(error);
      });
  }
}
