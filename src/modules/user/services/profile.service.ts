import { ObjectId } from 'mongoose';
import { HttpStatusCode } from '../../../common/utils/httpStatusCodes';
import { ServiceResponse } from '../../../common/utils/ServiceResponse';
import { IUser } from '../user.interface';
import { UserRepository } from '../user.repository';

export class ProfileService {
  static async getUserData(userId: ObjectId): Promise<ServiceResponse<IUser>> {
    const user = await UserRepository.getById(userId, ['username', 'email', 'email', 'profilePic']);

    if (!user) {
      return new ServiceResponse(HttpStatusCode.NOT_FOUND, null, 'Not found');
    }

    return new ServiceResponse(HttpStatusCode.OK, user, 'Ok');
  }

  static async UpdateUserInfo(
    userID: ObjectId,
    username: string,
    email: string
  ): Promise<ServiceResponse<IUser>> {
    try {
      const userInDbWithSameEmail = await UserRepository.getByEmail(email);

      if (Boolean(userInDbWithSameEmail)) {
        return new ServiceResponse(
          HttpStatusCode.BAD_REQUEST,
          null,
          'user with that email already exists'
        );
      }

      const user = await UserRepository.updateUser(userID, { username: username, email: email });

      return new ServiceResponse(HttpStatusCode.OK, user, 'OK');
    } catch (e) {
      return new ServiceResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, null, 'Unexpected error');
    }
  }
}
