import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './resolves';
import { typeDefs, typeDefs2 } from './schema';

export class App {
  async bootstrap() {
    const server = new ApolloServer({
      typeDefs: [typeDefs, typeDefs2],
      resolvers: resolvers,
    });
    await server.start();

    const app = express();
    server.applyMiddleware({ app });

    app.use('/', (req, res) => res.send('in home'));

    app.listen({ port: 4000 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      )
    );
  }
}
