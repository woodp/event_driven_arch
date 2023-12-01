import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { queueOptions } from '@event-driven-arch/common';

const user = process.env.RABBITMQ_USER;
const password = process.env.RABBITMQ_PASSWORD;
const host = process.env.RABBITMQ_HOST;

queueOptions.notifications.options.urls = [`amqp://${user}:${password}@${host}`];
queueOptions.notifications.options.noAck = true; // this is to fix a stupid behaviour of RabbitMQ

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([queueOptions.notifications]),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}