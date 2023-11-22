import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private ENABLED = 'enabled'
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache){}

  async createNotification(data: any): Promise<boolean> {
    const enabled = true; //  await this.cacheManager.get(this.ENABLED);
    if (!enabled) {
      console.log('Notifications service is down');
      throw new Error('Notification service is down');
    }
    console.log('Notification created');
    return true;
  }

  async toggleMode(mode: boolean) : Promise<boolean> {
    await this.cacheManager.set(this.ENABLED, mode);
    return true;
  }
}
