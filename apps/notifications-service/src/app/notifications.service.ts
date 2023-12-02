import { CreateNotificationPayload } from "@event-driven-arch/common";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NotificationsService {

  sendNotification(payload: CreateNotificationPayload) {
    if (payload.type === 'sms') {
      const message = 'SMS notifications service is down';
      console.log(message);
      throw Error(message);
    } else {
      console.log(`Notification ${payload.id} sent`);
    }
  }
}