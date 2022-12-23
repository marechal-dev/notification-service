import { InMemoryNotificationsRepository } from '@Test/repositories/in-memory-notifications-repository';

import { NotificationFactory } from '@Test/factories/notification-factory';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get Recipient Notifications', () => {
  it('should be able to get all the notifications for a given recipient', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);

    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recipientId: 'recipient-1',
        }),
        expect.objectContaining({
          recipientId: 'recipient-1',
        }),
      ]),
    );
  });
});
