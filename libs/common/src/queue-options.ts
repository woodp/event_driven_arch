import { ClientProviderOptions, RmqOptions, Transport } from '@nestjs/microservices';

const queueName = "notifications";
const recoveryQueue = "recovery";

const rmqOptions: RmqOptions =
{
  transport: Transport.RMQ,
  options: {
    // require explicit acknowledgement of messages
    noAck: false,
  },
}

const notifications: ClientProviderOptions = {
  ...rmqOptions,
  name: 'NOTIFICATIONS_SERVICE',
  options: {
    ...rmqOptions.options,
    queue: queueName,
    queueOptions: {
      durable: true,
      // // setup the dead letter exchange to point to the default exchange
      // deadLetterExchange: "",
      // // dead letters from our notifications-queue should be routed to the recovery-queue
      // deadLetterRoutingKey: "recovery",
      // // set message time to live to 4s
      // messageTtl: 4000,
    },
  },
};

const recovery: ClientProviderOptions = {
  ...rmqOptions,
  name: recoveryQueue,
  options: {
    ...rmqOptions.options,
    queue: recoveryQueue,
  },
};

export const queueOptions = {
  notifications,
  recovery,
};