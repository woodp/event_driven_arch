import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Queue } from 'bull';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('NOTIFICATIONS_SERVICE') private readonly notificationsClient: ClientProxy) {
    this.notificationsClient.connect();
  }

  async createLoan() {
    console.log('Createing loan....');
    try {
      const notification = {
        message: 'Loan created',
        status: 'succeed',
        delay: 100,
      };
      const resp = this.notificationsClient.send('create_notification', JSON.stringify(notification))
      console.log('Loan created');
      const value = await firstValueFrom(resp);
      console.log(`${JSON.stringify(value)}`);
    } catch(err) {
      console.log(`Error when trying to send 'create_notification', ${JSON.stringify(err)}`);
      throw err;
    }
  }

}
