import { MONGO_DB_URI } from './common/config/env.config';
import { App } from './modules/app';
import { connectToDB } from './common/database/connect';
import { PORT } from './common/config/constants.config';

const bootstrap = () => {
  const app = new App();
  connectToDB(MONGO_DB_URI);
  app.listen(PORT);
};

bootstrap();
