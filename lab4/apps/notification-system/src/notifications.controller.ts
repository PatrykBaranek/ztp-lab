import { Body, Controller, Post } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { EventPattern, Payload } from "@nestjs/microservices";
import { RABBIT_PATTERNS } from "@app/common/constants/rabbitmq.constants";
import { CreateNotificationDto } from "libs/common/src/database/dto/create-notification.dto";


@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationService: NotificationsService) { }

  @Post()
  async createNotification(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.createNotification(createNotificationDto);
  }

  @EventPattern(RABBIT_PATTERNS.SEND_NOTIFICATION)
  async sendNotification(@Payload() data: any) {
    return this.notificationService.sendNotification(data);
  }
}
