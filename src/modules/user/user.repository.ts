import { ObjectId, QueryOptions } from 'mongoose';
import { TRegisterDto } from './dto/auth.dto';
import { UpdateUserDto } from './dto/user.dto';
import { UserModel } from './user.schema';

export class UserRepository {
  static async getByEmail(email: string, fields: string[] = []) {
    return UserModel.findOne({ email }, fields);
  }

  static async getById(id: ObjectId, fields: string[] = []) {
    return UserModel.findById(id, fields);
  }

  static async save(user: TRegisterDto) {
    const userToSave = new UserModel({
      ...user,
    });

    return await userToSave.save();
  }

  static async updateUser(id: ObjectId, data: UpdateUserDto, options?: QueryOptions) {
    return UserModel.findByIdAndUpdate(id, data, {
      ...options,
      new: true,
      fields: ['username', 'email', 'profilePic'],
    });
  }
}
