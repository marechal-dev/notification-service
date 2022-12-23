import { InMemoryNotificationsRepository } from '@Test/repositories/in-memory-notifications-repository';

import { CountRecipientNotifications } from './count-recipient-notifications';
import { NotificationFactory } from '@Test/factories/notification-factory';

describe('Count Recipient Notifications', () => {
  it('should be able to count how many notifications a given recipient have.', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      NotificationFactory.make({ recipientId: 'recipient-1' }),
    );
    await notificationsRepository.create(
      NotificationFactory.make({ recipientId: 'recipient-1' }),
    );
    await notificationsRepository.create(
      NotificationFactory.make({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
