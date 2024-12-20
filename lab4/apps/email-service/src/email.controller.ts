import { RABBIT_PATTERNS } from '@app/common/constants/rabbitmq.constants';
import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class EmailController {
  private readonly logger = new Logger(EmailController.name);

  @EventPattern(RABBIT_PATTERNS.SEND_EMAIL)
  async sendEmailHandler(@Payload() data: any, @Ctx() context: RmqContext) {
    this.logger.log(`Message received from ${context.getPattern()}`);
    this.logger.log(`Received email notification: ${JSON.stringify(data)}`);

    try {
      this.logger.log(`Sending email to ${data.recipient}: ${data.content}`);

      this.logger.log(`Email sent successfully`);
    } catch (err) {
      this.logger.error('Failed to send email', err);
    }
  }
}
