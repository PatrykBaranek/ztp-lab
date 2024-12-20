import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notifications.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RABBIT_QUEUES } from '@app/common/constants/rabbitmq.constants';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://user:password@rabbitmq:5672'],
      queue: RABBIT_QUEUES.SCHEDULE_NOTIFICATIONS,
      queueOptions: {
        durable: true,
      }
    }
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
