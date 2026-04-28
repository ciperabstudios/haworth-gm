export class DialogManagerError extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, DialogManagerError.prototype);
  }
}