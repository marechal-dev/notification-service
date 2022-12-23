import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFoundException } from './errors/notification-not-found';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  public constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundException();
    }

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}
