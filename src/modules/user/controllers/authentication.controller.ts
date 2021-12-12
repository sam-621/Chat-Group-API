import { Request, Response, Router } from 'express';
import { IController } from '../../../common/interfaces/util.interface';
import { ControllerResponse } from '../../../common/utils/ControllerResponse';
import { TRegisterDto } from '../dto/auth.dto';
import { AuthenticationService } from '../services/authentication.service';
import { registerValidator } from '../validators/authentication.validator';
import { dataValidator } from '../../../common/middlewares/data-validator.middleware';

export class AuthenticationController implements IController {
  path = '/user/auth';
  router = Router();

  constructor() {
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.post(`${this.path}/register`, registerValidator, dataValidator, this.register);
  }

  private async register(req: Request, res: Response) {
    const userRegisterData: TRegisterDto = req.body;

    const serviceResponse = await AuthenticationService.register(userRegisterData);

    new ControllerResponse(serviceResponse, res);
  }
}
