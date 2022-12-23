import {
  Notification,
  NotificationProps,
} from '@Application/entities/notification';
import { Content } from '@Application/entities/content';

type Override = Partial<NotificationProps>;

export class NotificationFactory {
  public static make(override: Override = {}) {
    return new Notification({
      category: 'social',
      content: new Content('Nova solicitação de amizade!'),
      recipientId: 'example-recipient-id',
      ...override,
    });
  }
}
