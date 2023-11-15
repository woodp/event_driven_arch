import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(@InjectQueue('notifications') private readonly notificationsQueue: Queue) {}

  async createLoan() {
    console.log('Create loan....');
    await this.notificationsQueue.add({ message: 'Loan crated' });
    console.log('Loan created');
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
