import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { BullModule } from '@nestjs/bull';
// import { AppConsumer } from './app.consumer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register(),
    // BullModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) =>
    //     ({
    //         redis: {
    //           host: configService.getOrThrow('QUEUE_HOST'), // 'localhost',
    //           port: configService.getOrThrow('QUEUE_PORT'), // 6379,
    //           username: configService.getOrThrow('QUEUE_USERNAME'),
    //           password: configService.getOrThrow('QUEUE_PASSWORD'),
    //         },
    //     }),
    //     inject: [ConfigService],
    // }),
    // BullModule.registerQueue({
    //   name: 'notifications',
    // }),
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    // AppConsumer,
  ],
})

export class AppModule {}