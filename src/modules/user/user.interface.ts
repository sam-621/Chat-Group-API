import { Document, ObjectId } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  profilePic?: string;
}

export type TUpdateUser = Omit<IUser, 'password'>;
export type TUserDocument = Document<any, any, IUser> &
  IUser & {
    _id: ObjectId;
  };

export interface IPayload {
  id: ObjectId;
}

export interface IAuthenticationResponse {
  token: string;
  user: TAuthenticationUser;
}

export type TAuthenticationUser = Document<any, any, Omit<IUser, 'password'>> &
  IUser & {
    _id: ObjectId;
  };
