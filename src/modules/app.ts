import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './resolves';
import { typeDefs, typeDefs2 } from './schema';
import passport from 'passport';
import { loadLocalStrategy } from '../common/auth/strategies/local.strategy';

export class App {
  async bootstrap() {
    const server = new ApolloServer({
      typeDefs: [typeDefs, typeDefs2],
      resolvers: resolvers,
    });

    await server.start();

    const app = express();
    app.use(express.json());
    server.applyMiddleware({ app });

    loadLocalStrategy(passport);
    app.use(passport.initialize());

    app.get('/', (req, res) => res.send('in home'));

    app.post(
      '/login',
      passport.authenticate('local', {
        successRedirect: '/success',
        failureRedirect: '/fail',
      })
    );

    app.get('/fail', (req, res) => res.send('fail :('));
    app.get('/success', (req, res) => res.send('success :D'));

    app.listen({ port: 4000 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      )
    );
  }
}
