import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { HttpStatusCode } from '../utils/httpStatusCodes';
import { MiddlewareResponse } from '../utils/middlewareResponse';

export const dataValidator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) next();

  return new MiddlewareResponse(
    'Wrong data schema',
    res,
    HttpStatusCode.BAD_REQUEST,
    errors.array()
  );
};
