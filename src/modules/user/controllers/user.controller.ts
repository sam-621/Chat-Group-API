import { Request, Response, Router } from 'express';
import { IController } from '../../../common/interfaces/util.interface';

export class UserController implements IController {
  path = '/user/profile';
  router = Router();

  constructor() {
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get(`${this.path}/information`, this.getUserData);
  }

  async getUserData(req: Request, res: Response) {
    console.log('hi');
  }
}
