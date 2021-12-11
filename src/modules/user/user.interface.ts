import { ObjectId } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  profilePic?: string;
}

export interface IPayload {
  id: ObjectId;
}
