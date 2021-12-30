import { Request, Response, Router } from 'express';
import { IController } from '../../../common/interfaces/util.interface';
import { dataValidator } from '../../../common/middlewares/data-validator.middleware';
import { hasValidJwt } from '../../../common/middlewares/jwt.middleware';
import { ControllerResponse } from '../../../common/utils/ControllerResponse';
import { UpdateUserDto, UserDto } from '../dto/user.dto';
import { ProfileService } from '../services/profile.service';
import { updateProfileValidator } from '../validators/profile.validator';

export class ProfileController implements IController {
  path = '/user/profile';
  router = Router();

  constructor() {
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get(`${this.path}/information`, hasValidJwt, this.getUserData);
    this.router.put(
      `${this.path}/edit`,
      hasValidJwt,
      updateProfileValidator,
      dataValidator,
      this.updateUserData
    );
  }

  async getUserData(req: Request, res: Response) {
    const userDto = req.user as UserDto;

    const ServiceResponse = await ProfileService.getUserData(userDto.id);

    return new ControllerResponse(ServiceResponse, res);
  }

  async updateUserData(req: Request, res: Response) {
    const userId = req.user as UserDto;
    const userDto = req.body as UpdateUserDto;

    const ServiceResponse = await ProfileService.UpdateUserInfo(userId.id, userDto);

    return new ControllerResponse(ServiceResponse, res);
  }
}
