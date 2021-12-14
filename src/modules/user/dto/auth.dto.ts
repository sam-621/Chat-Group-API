import { IUser } from '../user.interface';

export type TRegisterDto = Omit<IUser, 'profilePic'>;
export type TLoginDto = Pick<IUser, 'email' | 'password'>;
