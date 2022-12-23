import { CancelNotification } from '@Application/use-cases/cancel-notification';
import { CountRecipientNotifications } from '@Application/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@Application/use-cases/get-recipient-notifications';
import { ReadNotification } from '@Application/use-cases/read-notification';
import { UnreadNotification } from '@Application/use-cases/unread-notification';
import { Module } from '@nestjs/common';
import { SendNotification } from '../../application/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
class HttpModule {}

export { HttpModule };
