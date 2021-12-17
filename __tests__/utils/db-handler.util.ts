import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { MockUser } from './fake-data.util';
import bcryptjs from 'bcryptjs';
import { SALT } from '../../src/common/config/constants.config';
import { UserModel } from '../../src/modules/user/user.schema';
import { AuthService } from '../../src/common/auth/auth.service';
import { IPayload } from '../../src/modules/user/user.interface';

class MongoSingleton {
  private static instance: MongoMemoryServer;

  private constructor() {}

  public static async getInstance(): Promise<MongoMemoryServer> {
    if (!MongoSingleton.instance) {
      MongoSingleton.instance = await MongoMemoryServer.create();
    }

    return MongoSingleton.instance;
  }
}

export const dbConnection = async (done: jest.DoneCallback) => {
  const mongo = await MongoSingleton.getInstance();
  const uri = mongo.getUri();

  await mongoose.connect(uri);
  done();
};

export const dbClose = async (done: jest.DoneCallback) => {
  const mongo = await MongoSingleton.getInstance();
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
  done();
};

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

export const saveUserInDB = async (
  email = 'admin@gmail.com',
  password = '123456',
  username = 'admin'
): Promise<string> => {
  const mockUser = new MockUser(email, password, username);

  mockUser.password = await bcryptjs.hash(mockUser.password, SALT);

  const newUser = await UserModel.create(mockUser);

  const payload: IPayload = {
    id: newUser._id,
  };

  const token = AuthService.createJWT(payload);

  return token;
};
