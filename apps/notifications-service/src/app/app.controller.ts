import { Controller } from '@nestjs/common';

import { AppService } from './app.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { 
  CREATE_NOTIFICATION_FAILURE_PATTERN, 
  CREATE_NOTIFICATION_PATTERN, 
  CREATE_NOTIFICATION_SUCCESS_PATTERN, 
  CreateNotificationPayload,
} from '@event-driven-arch/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(CREATE_NOTIFICATION_PATTERN)
  public async createNotification(
    @Payload() payload: CreateNotificationPayload, 
    @Ctx() context: RmqContext
  ) {
    console.log('Notification message received');
    return this.appService.createNotification(payload, context);
  }

  @EventPattern(CREATE_NOTIFICATION_SUCCESS_PATTERN)
  notificationSuccessEvent(
    @Payload() payload: CreateNotificationPayload,
    @Ctx() context: RmqContext,
  ) {
    console.log(`Notification for id ${payload.id} was sent`);
    context.getChannelRef().ack(context.getMessage());
  }

  @EventPattern(CREATE_NOTIFICATION_FAILURE_PATTERN)
  notificationFailureEvent(
    @Payload() payload: CreateNotificationPayload,
    @Ctx() context: RmqContext,
  ) {
    console.error(
      `Notification for id ${payload.id} couldn't be sent. Will not retry`,
    );
    context.getChannelRef().ack(context.getMessage());
  }

}
