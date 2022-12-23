import { InMemoryNotificationsRepository } from '@Test/repositories/in-memory-notifications-repository';

import { CancelNotification } from './cancel-notification';
import { NotificationNotFoundException } from './errors/notification-not-found';
import { NotificationFactory } from '@Test/factories/notification-factory';

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = NotificationFactory.make();

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a notification when it does not exist', () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrowError(NotificationNotFoundException);
  });
});
