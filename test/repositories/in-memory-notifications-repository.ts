import { NotificationsRepository } from '@Application/repositories/notifications-repository';
import { Notification } from '@Application/entities/notification';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  public async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (notification) => notification.id === notificationId,
    );

    if (!notification) {
      return null;
    }

    return notification;
  }

  public async findManyByRecipientId(
    recipientId: string,
  ): Promise<Notification[]> {
    const notifications = this.notifications.filter(
      (item) => item.recipientId === recipientId,
    );

    return notifications;
  }

  public async countManyByRecipientId(recipientId: string): Promise<number> {
    const numberOfNotifications = this.notifications.filter(
      (item) => item.recipientId === recipientId,
    ).length;

    return numberOfNotifications;
  }

  public async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }
}
