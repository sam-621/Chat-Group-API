import { Request, Response, Router } from 'express';
import { IController } from '../../../common/interfaces/util.interface';
import { hasValidJwt } from '../../../common/middlewares/jwt.middleware';
import { ControllerResponse } from '../../../common/utils/ControllerResponse';

export class UserController implements IController {
  path = '/user/profile';
  router = Router();

  constructor() {
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get(`${this.path}/information`, hasValidJwt, this.getUserData);
  }

  async getUserData(req: Request, res: Response) {
    console.log(req.user);
    return new ControllerResponse({ data: req.user, message: 'OK', statusCode: 200 }, res);

    console.log('hi');
  }
}
