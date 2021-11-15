import { PassportStatic } from 'passport';
import LocalStrategy from 'passport-local';

export const loadLocalStrategy = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy.Strategy(
      {
        usernameField: 'email',
      },
      (email, password, done) => {
        console.log('hi');

        if (email !== 'admin' || password !== '123') {
          return done('Wrong credentials', null);
        }

        return done(null, { email, password });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (id, done) {
    done(null, id);
  });
};
