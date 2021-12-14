import express, { Application } from 'express';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { resolvers } from './resolves';
import { typeDefs, typeDefs2 } from './schema';
import morgan from 'morgan';
import { IController } from '../common/interfaces/util.interface';
import { apiKeyValidator } from '../common/middlewares/api-key.middleware';
import { createServer, Server } from 'http';
import { AuthenticationController } from './user/controllers/authentication.controller';

export class App {
  server: Server;
  app: Application;
  apolloServer: ApolloServer<ExpressContext>;
  controllers: IController[];

  constructor() {
    this.controllers = [new AuthenticationController()];
    this.setupExpressApp();
    this.setupControllers();
    this.setupApolloServer();
  }

  listen(port: number) {
    this.server.listen({ port }, () => {
      console.log(`🚀 Server ready at http://localhost:${port}`);
    });
  }

  private setupExpressApp() {
    this.app = express();
    this.server = createServer(this.app);
    this.setupExpressMiddleware();
  }

  private async setupApolloServer() {
    this.apolloServer = new ApolloServer({
      typeDefs: [typeDefs, typeDefs2],
      resolvers: resolvers,
    });

    await this.apolloServer.start();

    this.setupApolloServerMiddleware();
  }

  private setupControllers() {
    this.controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private setupExpressMiddleware() {
    this.app.use(apiKeyValidator);
    this.app.use(morgan('dev'));
    this.app.use(express.json());
  }

  private setupApolloServerMiddleware() {
    this.apolloServer.applyMiddleware({ app: this.app });
  }
}
