import { ObjectId } from 'mongoose';
import { TRegisterDto } from './dto/auth.dto';
import { UserModel } from './user.schema';

export class UserRepository {
  static async getByEmail(email: string, fields: string[] = []) {
    return UserModel.findOne({ email }, ...fields);
  }

  static async getById(id: ObjectId, fields: string[] = []) {
    return UserModel.findById(id, ...fields);
  }

  static async save(user: TRegisterDto) {
    const userToSave = new UserModel({
      ...user,
    });

    return await userToSave.save();
  }
}
