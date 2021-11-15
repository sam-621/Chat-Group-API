import { PassportStatic } from 'passport';
import LocalStrategy from 'passport-local';

export const loadPassport = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy.Strategy((username, password, done) => {
      // User.findOne({ username: username }, function (err, user) {
      //   if (err) {
      //     return done(err);
      //   }
      //   if (!user) {
      //     return done(null, false, { message: 'Incorrect username.' });
      //   }
      //   if (!user.validPassword(password)) {
      //     return done(null, false, { message: 'Incorrect password.' });
      //   }
      //   return done(null, user);
      // });
      if (username !== 'admin' || password !== '123') {
        return done('Wrong credentials', null);
      }

      return done(null, { username, password });
    })
  );
};
