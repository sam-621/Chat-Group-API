import { Request, Response, Router } from 'express';
import { IController } from '../../../common/interfaces/util.interface';
import { hasValidJwt } from '../../../common/middlewares/jwt.middleware';
import { ControllerResponse } from '../../../common/utils/ControllerResponse';
import { UserDto } from '../dto/user.dto';
import { ProfileService } from '../services/profile.service';

export class ProfileController implements IController {
  path = '/user/profile';
  router = Router();

  constructor() {
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get(`${this.path}/information`, hasValidJwt, this.getUserData);
  }

  async getUserData(req: Request, res: Response) {
    const userDto = req.user as UserDto;

    const ServiceResponse = await ProfileService.getUserData(userDto.id);

    return new ControllerResponse(ServiceResponse, res);
  }
}
