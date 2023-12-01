/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { queueOptions } from '@event-driven-arch/common';

async function bootstrap() {

  const user = process.env.RABBITMQ_USER;
  const password = process.env.RABBITMQ_PASSWORD;
  const host = process.env.RABBITMQ_HOST;

  queueOptions.notifications.options.urls = [`amqp://${user}:${password}@${host}`];

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    queueOptions.notifications,
  );
  await app.listen();
  Logger.log('Notifications service started');
}

bootstrap();
