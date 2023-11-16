import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(@InjectQueue('notifications') private readonly notificationsQueue: Queue) {}

  async createLoan() {
    console.log('Create loan....');
    const queueElement = await this.notificationsQueue.add(
      {
        message: 'Loan created',
        status: 'succeed',
        delay: 100,
      }
    );
    console.log('Loan created');
    console.log(`${JSON.stringify(queueElement)}`);
  }

}
