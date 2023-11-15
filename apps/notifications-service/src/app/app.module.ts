import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { AppConsumer } from './app.consumer';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'redis-17879.c239.us-east-1-2.ec2.cloud.redislabs.com', // 'localhost',
        port: 17879, // 6379,
        username: 'default',
        password: 'wzbfJoC8kFzJFMtUGUWlIwIFaVQoFFZ0',
      },
    }),
    BullModule.registerQueue({
      name: 'notifications',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppConsumer],
})

export class AppModule {}