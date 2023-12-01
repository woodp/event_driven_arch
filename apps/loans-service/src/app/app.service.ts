import { queueOptions } from '@event-driven-arch/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {

  constructor(@Inject(queueOptions.notifications.name) private readonly notificationsClient: ClientProxy) {
    // this.notificationsClient.connect();
  }

  async createLoan() {
    console.log('Createing loan....');
    try {
      const notification = { message: 'Loan created' };
      const resp = this.notificationsClient.send('create_notification', JSON.stringify(notification))
      console.log('Loan created');
      const value = await firstValueFrom(resp);
      console.log(`${JSON.stringify(value)}`);
    } catch(err) {
      console.log(`Error when trying to send 'create_notification', ${JSON.stringify(err)}`);
      throw err;
    }
  }

  async toggleNotifications(data) {
    const resp = this.notificationsClient.send('toggle_enabled', JSON.stringify(data));
    console.log(`Toggle notifications ${data.enabled ? "on" : "off"}`);
    const value = await firstValueFrom(resp);
    console.log(`${JSON.stringify(value)}`);
  }

}
