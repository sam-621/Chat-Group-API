import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IPayload } from '../../modules/user/user.interface';
import { SALT } from '../config/constants.config';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.config';
import { getErrorMessage } from '../utils/error';

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, SALT);
    } catch (error) {
      getErrorMessage(error);
    }
  }

  static async comparePasswords(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      getErrorMessage(error);
    }
  }

  static async createJWT(payload: IPayload) {
    try {
      return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    } catch (error) {
      getErrorMessage(error);
    }
  }

  static async verifyJWT(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      getErrorMessage(error);
    }
  }

  static async decodeToken(token: string): Promise<IPayload | null> {
    try {
      return jwt.decode(token) as IPayload;
    } catch (error) {
      getErrorMessage(error);
    }
  }
}
