import mongoose from 'mongoose';
import { ENVIRONMENTS } from '../config/constants.config';
import { MODE } from '../config/env.config';
import { getErrorMessage } from '../utils/error';

const { DEVELOPMENT } = ENVIRONMENTS;

export const connectToDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    MODE === DEVELOPMENT ? console.log(`DB connected [${uri}]`) : console.log('DB connected');
  } catch (error) {
    getErrorMessage(error);
    throw new Error('DB connection was wrong');
  }
};
