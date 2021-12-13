import { AuthService } from '../../../common/auth/auth.service';
import { HttpStatusCode } from '../../../common/utils/httpStatusCodes';
import { ServiceResponse } from '../../../common/utils/ServiceResponse';
import { TRegisterDto } from '../dto/auth.dto';
import { IPayload } from '../user.interface';
import { UserRepository } from '../user.repository';

export class AuthenticationService {
  static async register(user: TRegisterDto): Promise<ServiceResponse<string>> {
    try {
      const userInDbWithSameEmail = await UserRepository.getByEmail(user.email);

      if (Boolean(userInDbWithSameEmail)) {
        return new ServiceResponse(
          HttpStatusCode.BAD_REQUEST,
          null,
          'user with that email already exists'
        );
      }

      const hashedPassword = await AuthService.hashPassword(user.password);

      const userToSave: TRegisterDto = {
        ...user,
        password: hashedPassword,
      };

      const userSaved = await UserRepository.save(userToSave);

      const payload: IPayload = {
        id: userSaved._id,
      };

      const token = await AuthService.createJWT(payload);

      return new ServiceResponse(HttpStatusCode.CREATED, token, 'user registered');
    } catch (error) {
      return new ServiceResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, null, 'Unexpected error');
    }
  }
}
