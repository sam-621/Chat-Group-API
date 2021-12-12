import { NextFunction, Request, Response, Router } from 'express';
import { MiddlewareResponse } from '../utils/middlewareResponse';

export interface IController {
  path: string;
  router: Router;
}

export interface IMiddleware {
  (req: Request, res: Response, next: NextFunction):
    | MiddlewareResponse
    | Promise<MiddlewareResponse>;
}
