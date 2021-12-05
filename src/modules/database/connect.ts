import mongoose from 'mongoose';
import { ENVIRONMENTS } from '../../common/config/constants.config';
import { MODE } from '../../common/config/env.config';

const { DEVELOPMENT } = ENVIRONMENTS;

export const connectToDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    MODE === DEVELOPMENT ? console.log(`DB connected [${uri}]`) : console.log('DB connected');
  } catch (error) {
    console.log(error);
    throw new Error('DB connection was wrong');
  }
};
