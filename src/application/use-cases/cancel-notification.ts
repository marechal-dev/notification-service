import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFoundException } from './errors/notification-not-found';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  public constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundException();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
