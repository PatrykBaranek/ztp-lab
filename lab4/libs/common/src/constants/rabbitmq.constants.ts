export enum RABBIT_QUEUES {
  EMAIL_NOTIFICATIONS = "email_notifications",
  PUSH_NOTIFICATIONS = "push_notifications",
  SCHEDULE_NOTIFICATIONS = "schedule_notification",
};

export enum RABBIT_PATTERNS {
  SEND_EMAIL = "send_email",
  SEND_PUSH = "send_push",
  SEND_NOTIFICATION = "send_notification",
};

export enum RABBIT_TOKENS {
  EMAIL_NOTIFICATION = 'EMAIL_NOTIFICATION_SERVICE',
  PUSH_NOTIFICATIONS = 'PUSH_NOTIFICATION_SERVICE',
  SCHEDULE_NOTIFICATION = 'SCHEDULE_NOTIFICATION_SERVICE',
};