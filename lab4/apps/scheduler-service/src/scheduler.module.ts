import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RABBIT_QUEUES, RABBIT_TOKENS } from '@app/common/constants/rabbitmq.constants';
import { DatabaseModule } from '@app/common/database/database.module';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from '@app/common/database/schema/notification.schema';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
    ScheduleModule.forRoot(),
    ClientsModule.registerAsync([{
      name: RABBIT_TOKENS.SCHEDULE_NOTIFICATION,
      useFactory: (configService: ConfigService) => ({
        transport: Transport.RMQ,
        options: {
          urls: [configService.get<string>('RABBIT_URI')],
          queue: RABBIT_QUEUES.SCHEDULE_NOTIFICATIONS,
          queueOptions: {
            durable: true,
          },
        },
      }),
      inject: [ConfigService],
    }]),
  ],
  providers: [SchedulerService],
})
export class SchedulerModule { }