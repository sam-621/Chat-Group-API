import { MONGO_DB_URI } from './common/config/env.config';
import { App } from './modules/app';
import { connectToDB } from './modules/database/connect';

const app = new App();

connectToDB(MONGO_DB_URI);
app.bootstrap();
