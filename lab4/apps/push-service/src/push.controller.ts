import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RABBIT_PATTERNS } from '@app/common/constants/rabbitmq.constants';

@Controller()
export class PushController {
  private readonly logger = new Logger(PushController.name);

  @EventPattern(RABBIT_PATTERNS.SEND_PUSH)
  async sendPushHandler(@Payload() data: any, @Ctx() context: RmqContext) {
    this.logger.log(`Message received from ${context.getPattern()}`);
    this.logger.log(`Received email notification: ${JSON.stringify(data)}`);

    try {
      this.logger.log(`Sending push to ${data.recipient}: ${data.content}`);

      this.logger.log(`Push sent successfully`);
    } catch (err) {
      this.logger.error('Failed to send push', err);
    }
  }
}
