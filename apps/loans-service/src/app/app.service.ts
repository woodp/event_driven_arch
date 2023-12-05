import { CreateNotificationPayload, queueOptions } from '@event-driven-arch/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { v4 as uuid } from 'uuid'

@Injectable()
export class AppService {
  constructor(@Inject(queueOptions.notifications.name) private readonly notificationsClient: ClientProxy) {}

  async createLoansBatch(quantity: number) {
    for (let i = 1; i < quantity + 1; i++) {
      const type = i % 5 === 0 ? 'sms' : 'email';
      await this.createLoan(type);
    }
  }

  async createLoan(type: string) {
    const id = uuid()
    console.log(`Creating loan ${id}`);
    try {
      const message = `Loan ${id} created`;
      const notification: CreateNotificationPayload = { id, message, type };
      const resp = this.notificationsClient.send('create_notification', notification);
      console.log(message);
      return firstValueFrom(resp);
    } catch(err) {
      console.log(`Error creating loan ${id} - ${JSON.stringify(err)}`);
      throw err;
    }
  }

}
