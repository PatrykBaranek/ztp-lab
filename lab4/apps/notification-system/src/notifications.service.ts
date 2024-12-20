import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateNotificationDto, NotificationChannel } from "libs/common/src/database/dto/create-notification.dto";
import { Notification } from "libs/common/src/database/schema/notification.schema";
import { RABBIT_PATTERNS, RABBIT_TOKENS } from "@app/common/constants/rabbitmq.constants";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Injectable()
export class NotificationsService {

  constructor(
    @Inject(RABBIT_TOKENS.EMAIL_NOTIFICATION)
    private emailClient: ClientProxy,

    @Inject(RABBIT_TOKENS.PUSH_NOTIFICATIONS)
    private pushClient: ClientProxy,

    @InjectModel(Notification.name)
    private readonly notificationRepository: Model<Notification>
  ) { }

  async createNotification(createNotificationDto: CreateNotificationDto) {
    return await this.notificationRepository.create(createNotificationDto);
  }

  async sendNotification(createNotificationDto: CreateNotificationDto) {
    const { channel } = createNotificationDto;

    switch (channel) {
      case NotificationChannel.EMAIL:
        this.emailClient.emit(RABBIT_PATTERNS.SEND_EMAIL, createNotificationDto);
        break;

      case NotificationChannel.PUSH:
        this.pushClient.emit(RABBIT_PATTERNS.SEND_PUSH, createNotificationDto);
        break;
    }
  }
}