import { AuthService } from '../../../common/auth/auth.service';
import { getErrorMessage } from '../../../common/utils/error';
import { HttpStatusCode } from '../../../common/utils/httpStatusCodes';
import { ServiceResponse } from '../../../common/utils/ServiceResponse';
import { TLoginDto, TRegisterDto } from '../dto/auth.dto';
import { IAuthenticationResponse, IPayload, TAuthenticationUser } from '../user.interface';
import { UserRepository } from '../user.repository';

export class AuthenticationService {
  static async register(user: TRegisterDto): Promise<ServiceResponse<IAuthenticationResponse>> {
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

      const userSaved: TAuthenticationUser = await UserRepository.save(userToSave);
      userSaved.password = undefined;

      const payload: IPayload = {
        id: userSaved._id,
      };

      const token = await AuthService.createJWT(payload);

      const res: IAuthenticationResponse = {
        token,
        user: userSaved,
      };

      return new ServiceResponse(HttpStatusCode.CREATED, res, 'user registered');
    } catch (error) {
      getErrorMessage(error);
      return new ServiceResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, null, 'Unexpected error');
    }
  }

  static async login(user: TLoginDto): Promise<ServiceResponse<IAuthenticationResponse>> {
    try {
      const userInDb: TAuthenticationUser = await UserRepository.getByEmail(user.email);

      if (!userInDb) {
        return new ServiceResponse(HttpStatusCode.UNAUTHORIZED, null, 'wrong credentials');
      }

      const passwordsMatch = await AuthService.comparePasswords(user.password, userInDb.password);

      if (!passwordsMatch) {
        return new ServiceResponse(HttpStatusCode.UNAUTHORIZED, null, 'wrong credentials');
      }

      userInDb.password = undefined;

      const payload: IPayload = {
        id: userInDb._id,
      };

      const token = await AuthService.createJWT(payload);

      const res: IAuthenticationResponse = {
        token,
        user: userInDb,
      };

      return new ServiceResponse(HttpStatusCode.OK, res, 'OK');
    } catch (error) {
      getErrorMessage(error);
      return new ServiceResponse(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        null,
        'Internal server error'
      );
    }
  }
}
