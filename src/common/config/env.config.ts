import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

//APP
export const MODE = process.env.NODE_ENV;
export const PORT = Number(process.env.PORT);

//MONGO
export const MONGO_DB_URI = process.env.MONGO_DB_URI;

//JWT
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
