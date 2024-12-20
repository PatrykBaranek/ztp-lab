import { NestFactory } from '@nestjs/core';
import { PushModule } from './push.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RABBIT_QUEUES } from '@app/common/constants/rabbitmq.constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(PushModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://user:password@rabbitmq:5672'],
      queue: RABBIT_QUEUES.PUSH_NOTIFICATIONS,
      queueOptions: {
        durable: true,
      },
    }
  });
  await app.listen();
}
bootstrap();
