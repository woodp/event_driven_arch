import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Ctx, Payload, RmqContext } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private ENABLED = 'enabled'
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache){}

  async createNotification(@Payload() data: any, @Ctx() context: RmqContext): Promise<boolean> {
    const enabled = await this.cacheManager.get(this.ENABLED);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    if (!enabled) {
      console.log('Notifications service is down');
      channel.reject(originalMsg);
      console.log('Message rejected');
    } else {
      channel.ack(originalMsg);
      console.log('Notification created');
    }
    
    return true;
  }

  async toggleMode(@Payload() enabled: boolean, @Ctx() context: RmqContext) : Promise<boolean> {
    console.log(`enabled value: ${enabled}`)
    await this.cacheManager.set(this.ENABLED, enabled, 0);
    context.getChannelRef().ack(context.getMessage());
    return true;
  }
}
