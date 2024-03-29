import { ObjectId } from 'mongoose';
import { HttpStatusCode } from '../../../common/utils/httpStatusCodes';
import { ServiceResponse } from '../../../common/utils/ServiceResponse';
import { UpdateUserDto } from '../dto/user.dto';
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
    user: UpdateUserDto
  ): Promise<ServiceResponse<IUser>> {
    try {
      const updatedUser = await UserRepository.updateUser(userID, user);

      return new ServiceResponse(HttpStatusCode.OK, updatedUser, 'OK');
    } catch (e) {
      if (e.code === 11000) {
        return new ServiceResponse(
          HttpStatusCode.BAD_REQUEST,
          null,
          'user with that email already exists'
        );
      }

      return new ServiceResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, null, 'Unexpected error');
    }
  }
}
