import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, Ctx, Payload, RmqContext } from '@nestjs/microservices';
import { CREATE_NOTIFICATION_SUCCESS_PATTERN, CreateNotificationPayload, queueOptions } from '@event-driven-arch/common';
import { NotificationsService } from './notifications.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {

  constructor(
    private readonly notificationsService: NotificationsService,
    @Inject(queueOptions.notifications.name) private notificationsQueue: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

  async createNotification(@Payload() payload: CreateNotificationPayload, @Ctx() context: RmqContext): Promise<boolean> {
    const channel = context.getChannelRef();
    try {
      this.notificationsService.sendNotification(payload);
      channel.ack(context.getMessage());
      this.notificationsQueue.emit(CREATE_NOTIFICATION_SUCCESS_PATTERN, payload);
      return true;
    } catch (e) {
      const retryCount = await this.cacheManager.get<number>(payload.id) || 1;
      console.log(`retry count for message ${payload.id} is: ${retryCount}`);
      if (retryCount === 3) {
        channel.reject(context.getMessage(), false);
        console.log(`Message ${payload.id} dropped`);
      } else {
        await this.cacheManager.set(payload.id, retryCount + 1);
        channel.reject(context.getMessage());
        console.log(`Message ${payload.id} rejected and requeued`);
      }
      return false;
    }
  }



}
