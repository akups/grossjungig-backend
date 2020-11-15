const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    (email, password, cb) => {
      User.findOne({ email: email })
        .then(foundUser => {
          if (!foundUser) {
            return cb(null, false, { message: "Incorrect username." });
          }
          return bcrypt.compare(password, foundUser.password).then(match => {
            if (!match) {
              return cb(null, false, { message: "Incorrect password." });
            }
            cb(null, foundUser);
          });
        })
        .catch(err => {
          cb(err);
        });
    }
  )
);
