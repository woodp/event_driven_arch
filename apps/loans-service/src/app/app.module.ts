import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: 'NOTIFICATIONS_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${configService.getOrThrow('RABBITMQ_USER')}:${configService.getOrThrow('RABBITMQ_PASSWORD')}@${configService.getOrThrow('RABBITMQ_HOST')}`],
            queue: configService.getOrThrow('RABBITMQ_QUEUE_NAME'),
            queueOptions: {
              durable: true,
            },          },
        }),
        inject: [ConfigService],
      },
    ]),
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
  providers: [AppService],
})

export class AppModule {}