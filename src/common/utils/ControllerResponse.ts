import { Response } from 'express';
import { ServiceResponse } from './ServiceResponse';

export class ControllerResponse {
  serviceResponse: ServiceResponse;
  res: Response;

  constructor(serviceResponse: ServiceResponse, res: Response) {
    this.serviceResponse = serviceResponse;
    this.res = res;
    this.sendResponse();
  }

  sendResponse() {
    const { data, message, statusCode } = this.serviceResponse;
    this.res.status(statusCode).json({
      data,
      message,
    });
  }
}
