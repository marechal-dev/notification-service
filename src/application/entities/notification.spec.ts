import { Notification } from './notification';
import { Content } from './content';
import { randomUUID } from 'node:crypto';

describe('Notification Content', () => {
  it('should be able to create a Notification', () => {
    const notification = new Notification({
      content: new Content('Você recebeu uma solicitação de amizade!'),
      category: 'social',
      recipientId: randomUUID(),
    });

    expect(notification).toBeTruthy();
  });

  // it('should not be able to create a Notification Content with less than 5 characters', () => {
  //   expect(() => new Content('aaa')).toThrow();
  // });

  // it('should not be able to create a Notification Content with more than 240 characters', () => {
  //   expect(() => new Content('a'.repeat(241))).toThrow();
  // });
});
