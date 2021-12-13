import { IUser } from '../../src/modules/user/user.interface';

export class MockUser implements IUser {
  email: string;
  password: string;
  profilePic?: string;
  username: string;

  constructor(email: string, password: string, username: string, profilePic: string) {
    this.email = email;
    this.password = password;
    this.username = username;
    this.profilePic = profilePic;
  }
}
