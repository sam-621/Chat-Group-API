import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './resolves';
import { typeDefs, typeDefs2 } from './schema';
import passport from 'passport';
import { loadPassport } from '../common/auth/passport';
import LocalStrategy from 'passport-local';

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

    // loadPassport(passport);
    app.use(passport.initialize());
    passport.use(
      new LocalStrategy.Strategy((username, password, done) => {
        if (username !== 'admin' || password !== '123') {
          return done('Wrong credentials', null);
        }

        return done(null, { username, password });
      })
    );

    passport.serializeUser(function (user, done) {
      done(null, user);
    });

    passport.deserializeUser(function (id, done) {
      done(null, id);
    });

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
