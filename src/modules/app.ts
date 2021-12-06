import express, { Application } from 'express';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { resolvers } from './resolves';
import { typeDefs, typeDefs2 } from './schema';
import morgan from 'morgan';

export class App {
  app: Application;
  apolloServer: ApolloServer<ExpressContext>;

  constructor() {
    this.setupExpressApp();
    this.setupApolloServer();
    this.setupExpressMiddleware();
  }

  listen(port: number) {
    this.app.listen({ port }, () => {
      console.log(`🚀 Server ready at http://localhost:${port}`);
    });
  }

  private setupExpressApp() {
    this.app = express();
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

  private setupExpressMiddleware() {
    this.app.use(morgan('dev'));
    this.app.use(express.json());
  }

  private setupApolloServerMiddleware() {
    this.apolloServer.applyMiddleware({ app: this.app });
  }
}
