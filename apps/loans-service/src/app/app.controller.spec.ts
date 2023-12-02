import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
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
        ])
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('createLoan', () => {
    it('should create a Loan', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.createLoan({ type: 'email' })).toEqual({ success: true });
    });
  });
});
