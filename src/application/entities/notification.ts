import { randomUUID } from 'node:crypto';
import { Replace } from '@Helpers/replace';
import { Content } from './content';

interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
  createdAt: Date;
}

class Notification {
  private readonly _id: string;
  private props: NotificationProps;

  public constructor(
    props: Replace<NotificationProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public set recipientId(value: string) {
    this.props.recipientId = value;
  }

  public get content(): Content {
    return this.props.content;
  }

  public set content(value: Content) {
    this.props.content = value;
  }

  public get category(): string {
    return this.props.category;
  }

  public set category(value: string) {
    this.props.category = value;
  }

  public get readAt(): Date | undefined | null {
    return this.props.readAt;
  }

  public read(): void {
    this.props.readAt = new Date();
  }

  public unread(): void {
    this.props.readAt = null;
  }

  public get canceledAt(): Date | undefined | null {
    return this.props.canceledAt;
  }

  public cancel() {
    this.props.canceledAt = new Date();
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}

export { Notification, NotificationProps };
