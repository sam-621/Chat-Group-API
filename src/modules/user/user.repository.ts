import { ObjectId } from 'mongoose';
import { TRegisterUser } from './user.interface';
import { UserModel } from './user.schema';

export class UserRepository {
  static getUserByEmail(email: string, fields: string[] = []) {
    return UserModel.findOne({ email }, ...fields);
  }

  static getUserById(id: ObjectId, fields: string[] = []) {
    return UserModel.findById(id, ...fields);
  }

  static async saveUser(user: TRegisterUser) {
    const userToSave = new UserModel({
      ...user,
    });

    await userToSave.save();
  }
}
