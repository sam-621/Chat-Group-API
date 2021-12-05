import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './resolves';
import { typeDefs, typeDefs2 } from './schema';
import morgan from 'morgan';

export class App {
  async bootstrap() {
    const server = new ApolloServer({
      typeDefs: [typeDefs, typeDefs2],
      resolvers: resolvers,
    });

    await server.start();

    const app = express();
    app.use(morgan('dev'));
    app.use(express.json());
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      )
    );
  }
}
