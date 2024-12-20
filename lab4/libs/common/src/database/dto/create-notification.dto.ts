import { IsNotEmpty, IsEnum, IsString } from 'class-validator';

export enum NotificationChannel {
  EMAIL = 'EMAIL',
  PUSH = 'PUSH',
}

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @IsNotEmpty()
  @IsString()
  recipient: string;
}
