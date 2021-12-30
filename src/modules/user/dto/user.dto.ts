import { ObjectId } from 'mongoose';
import { IUser } from '../user.interface';

export type UserDto = {
  id: ObjectId;
};

export type UpdateUserDto = Omit<IUser, 'password'> & {
  profilePic: string;
};
