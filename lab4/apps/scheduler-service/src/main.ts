import { NestFactory } from '@nestjs/core';
import { SchedulerModule } from './scheduler.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RABBIT_QUEUES } from '@app/common/constants/rabbitmq.constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(SchedulerModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://user:password@rabbitmq:5672'],
      queue: RABBIT_QUEUES.SCHEDULE_NOTIFICATIONS,
      queueOptions: {
        durable: true,
      },
    }
  });
  await app.listen();
}
bootstrap();
