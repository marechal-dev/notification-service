export class Content {
  private readonly content: string;

  public constructor(content: string) {
    const isContentLengthNotValid = !this.validateContentLength(content);

    if (isContentLengthNotValid) {
      throw new Error('Content length error.');
    }

    this.content = content;
  }

  public get value(): string {
    return this.content;
  }

  private validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }
}
