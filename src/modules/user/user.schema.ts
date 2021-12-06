import { model, Schema } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, required: false, default: '' },
});

export const userModel = model<IUser>('users', userSchema);
