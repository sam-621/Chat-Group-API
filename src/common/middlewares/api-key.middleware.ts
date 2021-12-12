import { API_KEY } from '../config/env.config';
import { IMiddleware } from '../interfaces/util.interface';
import { HttpStatusCode } from '../utils/httpStatusCodes';
import { MiddlewareResponse } from '../utils/middlewareResponse';

export const apiKeyValidator: IMiddleware = (req, res, next) => {
  const apiKey = req.headers['authorization'];

  if (!apiKey || apiKey !== API_KEY) {
    return new MiddlewareResponse('No api key provided', HttpStatusCode.UNAUTHORIZED, res);
  }

  next();
};
