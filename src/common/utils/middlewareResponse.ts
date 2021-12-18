import { Response } from 'express';

export class MiddlewareResponse {
  message: string;
  res: Response;
  statusCode: number;
  error: unknown;

  constructor(message: string, statusCode: number, res: Response, error?: unknown) {
    this.message = message;
    this.res = res;
    this.statusCode = statusCode;
    this.error = error;
    this.sendResponse();
  }

  sendResponse() {
    this.res.status(this.statusCode).json({
      message: this.message,
      error: this.error,
    });
  }
}
