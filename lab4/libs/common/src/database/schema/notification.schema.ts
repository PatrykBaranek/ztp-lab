import { NotificationChannel } from '@app/common/database/dto/create-notification.dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export enum MessageStatus {
  PENDING = 'PENDING',
  SEND = 'SEND',
}

@Schema()
export class Notification {
  @Prop()
  id: number;

  @Prop()
  content: string;

  @Prop({
    type: String,
    enum: NotificationChannel,
  })
  channel: NotificationChannel;

  @Prop({
    type: String,
    enum: MessageStatus,
    default: MessageStatus.PENDING,
  })
  status: MessageStatus;

  @Prop()
  recipient: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
