import { Controller } from '@nestjs/common';

import { AppService } from './app.service';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { CREATE_NOTIFICATION_FAILURE_PATTERN, CREATE_NOTIFICATION_PATTERN, CREATE_NOTIFICATION_SUCCESS_PATTERN, CreateNotificationFailurePayload, CreateNotificationPayload, CreateNotificationSuccessPayload } from '@event-driven-arch/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(CREATE_NOTIFICATION_PATTERN)
  public async createToken(
    @Payload() payload: CreateNotificationPayload, 
    @Ctx() context: RmqContext
  ): Promise<any> {
    console.log('Notification message received');
    console.log(JSON.stringify(payload));
    return this.appService.createNotification(payload, context);
  }

  @EventPattern(CREATE_NOTIFICATION_SUCCESS_PATTERN)
  makeBurgerSuccessEvent(
    @Payload() payload: CreateNotificationSuccessPayload,
    @Ctx() context: RmqContext,
  ) {
    console.log(`Burger for ${payload.customer} is ready 😋`);
    context.getChannelRef().ack(context.getMessage());
  }

  @EventPattern(CREATE_NOTIFICATION_FAILURE_PATTERN)
  makeBurgerFailureEvent(
    @Payload() payload: CreateNotificationFailurePayload,
    @Ctx() context: RmqContext,
  ) {
    console.error(
      `Burger for ${payload.customer} couldn't be prepared. Will not retry 🔥`,
    );
    context.getChannelRef().ack(context.getMessage());
  }

  @MessagePattern('toggle_enabled') 
  public async toggleMode (@Payload() data: any, @Ctx() context: RmqContext) {
    const value = JSON.parse(data);
    console.log(value);
    return await this.appService.toggleMode(value.enabled, context);
  }

}
