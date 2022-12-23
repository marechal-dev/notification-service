import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { SendNotification } from '@Application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@Application/use-cases/cancel-notification';
import { ReadNotification } from '@Application/use-cases/read-notification';
import { UnreadNotification } from '@Application/use-cases/unread-notification';
import { CountRecipientNotifications } from '@Application/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@Application/use-cases/get-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  public constructor(
    private readonly sendNotification: SendNotification,
    private readonly cancelNotification: CancelNotification,
    private readonly readNotification: ReadNotification,
    private readonly unreadNotification: UnreadNotification,
    private readonly countRecipientNotifications: CountRecipientNotifications,
    private readonly getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  public async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  public async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get('from/:recipientId')
  public async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHTPP),
    };
  }

  @Patch(':id/read')
  public async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  public async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification: NotificationViewModel.toHTPP(notification) };
  }
}
