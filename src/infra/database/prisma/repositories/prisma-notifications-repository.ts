import { Injectable } from '@nestjs/common';
import { Notification } from '@Application/entities/notification';
import { NotificationsRepository } from '@Application/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/PrismaNotificationMapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  public constructor(private readonly prisma: PrismaService) {}

  public async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.create({
      data: raw,
    });
  }

  public async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notification);
  }

  public async findManyByRecipientId(
    recipientId: string,
  ): Promise<Notification[]> {
    const rawNotifications = await this.prisma.notification.findMany({
      where: {
        recipientId,
      },
    });

    const notifications = rawNotifications.map(
      PrismaNotificationMapper.toDomain,
    );

    return notifications;
  }

  public async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipientId,
      },
    });

    return count;
  }

  public async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }
}
