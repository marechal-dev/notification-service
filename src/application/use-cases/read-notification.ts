import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFoundException } from './errors/notification-not-found';

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  public constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundException();
    }

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}
