export class NotificationNotFoundException extends Error {
  public constructor() {
    super('Notification not found.');
  }
}
