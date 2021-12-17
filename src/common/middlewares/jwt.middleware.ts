import { IPayload } from '../../modules/user/user.interface';
import { UserRepository } from '../../modules/user/user.repository';
import { AuthService } from '../auth/auth.service';
import { IMiddleware } from '../interfaces/util.interface';
import { HttpStatusCode } from '../utils/httpStatusCodes';
import { MiddlewareResponse } from '../utils/middlewareResponse';

export const hasValidJwt: IMiddleware = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return new MiddlewareResponse('No token provided', HttpStatusCode.UNAUTHORIZED, res);
  }

  try {
    const decoded = await AuthService.decodeToken(token);

    if (!decoded) {
      return new MiddlewareResponse('invalid token', HttpStatusCode.UNAUTHORIZED, res);
    }

    const user = await UserRepository.getById(decoded.id, ['_id']);

    if (!user) {
      return new MiddlewareResponse('invalid token', HttpStatusCode.UNAUTHORIZED, res);
    }

    req.user = decoded as IPayload;
    next();
  } catch (err) {
    console.log(err);

    return new MiddlewareResponse(
      'Internal server error',
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      res
    );
  }
};
