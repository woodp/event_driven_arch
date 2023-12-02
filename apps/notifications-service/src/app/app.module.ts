import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { NotificationsService } from './notifications.service';
import { ClientsModule } from '@nestjs/microservices';
import { queueOptions } from '@event-driven-arch/common';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([queueOptions.notifications]),
    CacheModule.register(),
  ],
  controllers: [AppController],
  providers: [ AppService, NotificationsService ],
})

export class AppModule {}