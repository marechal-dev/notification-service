import { Notification } from '@Application/entities/notification';

export class NotificationViewModel {
  public static toHTPP(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
    };
  }
}
