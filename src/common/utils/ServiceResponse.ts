export class ServiceResponse<T = unknown> {
  statusCode: number;
  data: T = null;
  message: string = '';

  constructor(statusCode: number, data: T, message: string) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}
