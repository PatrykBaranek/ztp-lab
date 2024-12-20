import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { NotificationsController } from "./notifications.controller";
import { NotificationsService } from "./notifications.service";
import { RABBIT_QUEUES, RABBIT_TOKENS } from "@app/common/constants/rabbitmq.constants";
import { DatabaseModule } from "@app/common/database/database.module";
import { Notification, NotificationSchema } from "@app/common/database/schema/notification.schema";


@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
    ClientsModule.registerAsync([
      {
        name: RABBIT_TOKENS.EMAIL_NOTIFICATION,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBIT_URI')],
            queue: RABBIT_QUEUES.EMAIL_NOTIFICATIONS,
            queueOptions: {
              durable: true
            }
          }
        }),
        inject: [ConfigService],
      },
      {
        name: RABBIT_TOKENS.PUSH_NOTIFICATIONS,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBIT_URI')],
            queue: RABBIT_QUEUES.PUSH_NOTIFICATIONS,
            queueOptions: {
              durable: true
            }
          }
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationModule { }