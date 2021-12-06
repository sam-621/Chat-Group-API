import { IUser } from '../user.interface';

export type TRegisterDto = Omit<IUser, 'profilePic'>;
