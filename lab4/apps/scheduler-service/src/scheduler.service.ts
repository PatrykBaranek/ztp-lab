import { RABBIT_PATTERNS, RABBIT_TOKENS } from '@app/common/constants/rabbitmq.constants';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { MessageStatus, Notification } from '@app/common/database/schema/notification.schema';
import { Model } from 'mongoose';

@Injectable()
export class SchedulerService {

  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    @Inject(RABBIT_TOKENS.SCHEDULE_NOTIFICATION)
    private readonly scheduleClient: ClientProxy,

    @InjectModel(Notification.name)
    private readonly notificationRepository: Model<Notification>
  ) { }

  @Cron(CronExpression.EVERY_MINUTE)
  async sendNotification() {
    this.logger.log('Starting to process pending notifications');

    try {
      const pendingNotifications = await this.notificationRepository.find({ status: MessageStatus.PENDING }).limit(10);

      if (pendingNotifications.length === 0) {
        this.logger.log("Not Found any pending messages");
        return;
      }

      this.logger.log(`Found ${pendingNotifications.length} pending notifications`);

      for (const notification of pendingNotifications) {
        this.scheduleClient.emit(RABBIT_PATTERNS.SEND_NOTIFICATION, {
          content: notification.content,
          channel: notification.channel,
          recipient: notification.recipient,
        });

        await this.notificationRepository.findByIdAndUpdate(
          notification._id,
          {
            status: MessageStatus.SEND,
          }
        );

        this.logger.log(`Successfully queued notification ${notification._id}`);
      }
    } catch (err) {
      this.logger.error('Error in notification processing cron job:', err);
    }
  }
}