import { Request, Response, Router } from 'express';
import { IController } from '../../../common/interfaces/util.interface';
import { ControllerResponse } from '../../../common/utils/ControllerResponse';
import { TRegisterDto } from '../dto/auth.dto';
import { UserService } from '../user.service';

export class AuthenticationController implements IController {
  path = '/user';
  router = Router();

  async register(req: Request, res: Response) {
    const userRegisterData: TRegisterDto = req.body;

    const serviceResponse = await UserService.register(userRegisterData);

    new ControllerResponse(serviceResponse, res);
  }
}
