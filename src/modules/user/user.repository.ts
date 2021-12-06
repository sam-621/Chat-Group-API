import { ObjectId } from 'mongoose';
import { TRegisterUser } from './user.interface';
import { UserModel } from './user.schema';

export class UserRepository {
  static getByEmail(email: string, fields: string[] = []) {
    return UserModel.findOne({ email }, ...fields);
  }

  static getById(id: ObjectId, fields: string[] = []) {
    return UserModel.findById(id, ...fields);
  }

  static async save(user: TRegisterUser) {
    const userToSave = new UserModel({
      ...user,
    });

    return await userToSave.save();
  }
}
