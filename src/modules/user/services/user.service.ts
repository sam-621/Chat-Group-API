import { ObjectId } from 'mongoose';
import { HttpStatusCode } from '../../../common/utils/httpStatusCodes';
import { ServiceResponse } from '../../../common/utils/ServiceResponse';
import { IUser } from '../user.interface';
import { UserRepository } from '../user.repository';

export class UserService {
  static async getUserData(userId: ObjectId): Promise<ServiceResponse<IUser>> {
    const user = await UserRepository.getById(userId, ['username', 'email', 'email', 'profilePic']);

    if (!user) {
      return new ServiceResponse(HttpStatusCode.NOT_FOUND, null, 'Not found');
    }

    return new ServiceResponse(HttpStatusCode.OK, user, 'Ok');
  }
}
