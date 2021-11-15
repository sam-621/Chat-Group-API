import { PassportStatic } from 'passport';
import LocalStrategy from 'passport-local';

export const loadPassport = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy.Strategy((username, password, done) => {
      console.log('hi');

      if (username !== 'admin' || password !== '123') {
        return done('Wrong credentials', null);
      }

      return done(null, { username, password });
    })
  );
};
