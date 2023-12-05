import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { queueOptions } from '@event-driven-arch/common';

const user = process.env.RABBITMQ_USER;
const password = process.env.RABBITMQ_PASSWORD;
const host = process.env.RABBITMQ_HOST;

queueOptions.recovery.options.urls = [`amqp://${user}:${password}@${host}`];

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    // receive messages from the recovery-queue
    queueOptions.recovery
  );
  app.listen();
  Logger.log("Recovery worker is listening!");
}

bootstrap();
