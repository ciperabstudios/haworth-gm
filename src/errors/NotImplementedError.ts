export class NotImplementedError extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, NotImplementedError.prototype);
  }
}