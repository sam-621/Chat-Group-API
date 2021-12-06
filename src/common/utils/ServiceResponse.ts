export class ServiceResponse<T> {
  private statusCode: number;
  private data: T = null;
  private message: string = '';

  constructor(statusCode: number, data: T, message: string) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}
