import { NestFactory } from '@nestjs/core';
import { EmailServiceModule } from './email.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RABBIT_QUEUES } from '@app/common/constants/rabbitmq.constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EmailServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:password@rabbitmq:5672'],
        queue: RABBIT_QUEUES.EMAIL_NOTIFICATIONS,
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
