export interface IUser {
  username: string;
  email: string;
  password: string;
  profilePic?: string;
}

export type TRegisterUser = Omit<IUser, 'profilePic'>;
