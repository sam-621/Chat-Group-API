import { AuthService } from '../../common/auth/auth.service';
import { HttpStatusCode } from '../../common/utils/httpStatusCodes';
import { ServiceResponse } from '../../common/utils/ServiceResponse';
import { TRegisterUser } from './user.interface';
import { UserRepository } from './user.repository';

export class UserService {
  static async register(user: TRegisterUser) {
    const userInDbWithSameEmail = UserRepository.getByEmail(user.email);

    if (!userInDbWithSameEmail) {
      new ServiceResponse(HttpStatusCode.BAD_REQUEST, null, 'user with that email already exists');
    }

    const hashedPassword = await AuthService.hashPassword(user.password);

    const userToSave: TRegisterUser = {
      ...user,
      password: hashedPassword,
    };

    const userSaved = await UserRepository.save(userToSave);

    const payload = {
      id: userSaved._id,
    };

    const token = await AuthService.createJWT(payload);

    return new ServiceResponse(HttpStatusCode.CREATED, token, 'user registered');
  }
}
