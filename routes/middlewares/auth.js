import passport from "passport";
import passportJWT from "passport-jwt";
import passportLocal from "passport-local";

import User from "../../models/User";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

export default (app) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        await User.findOne({ email }, (err, user) => {
          if (err) return done(err);

          if (!user) {
            return done(null, false, { message: "User doesn't exist" });
          }

          user.compare(password, user.password).then((match) => {
            if (!match) {
              return done(null, false, { message: "Incorrect password" });
            }

            return done(null, user);
          });
        });
      }
    )
  );

  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
  };

  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      User.findOne({ _id: payload._id }, (err, user) => {
        if (err) {
          return done(err, false);
        }

        if (!user) {
          return done(null, false);
        }

        return done(null, { id: user._id });
      });
    })
  );

  app.use(passport.initialize());
};
