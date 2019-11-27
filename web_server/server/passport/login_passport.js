const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;

const config = require('../config/config.json');

module.exports = new PassportLocalStrategy({
  // By default, LocalStrategy expects to find credentials in parameters named username and password. 
  // If your site prefers to name these fields differently, options are available to change the defaults.
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (_, email, password, done) => {
  // When Passport authenticates a request, it parses the credentials contained in the request. 
  // It then invokes the verify callback with those credentials as arguments, in this case email and password
  const userData = {
    email: email.trim(),
    password: password.trim()
  };

  return User.findOne({ email: userData.email }, (err, user) => {
    if (err) { return done(err); }

    if (!user) {
      return done(null, false, { message: 'Incorrect email or password.' });
    }

    // check if a hashed user's password is equal to a value saved in the database
    return user.comparePassword(userData.password, (passwordErr, isMatch) => {
      if (err) { return done(err); }

      if (!isMatch) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }

      const payload = {
        substitute_id: user._id
      };

      // create a token string
      const token = jwt.sign(payload, config.jwtSecret);
      const data = {
        name: user.email,
        token: token
      };

      return done(null, data);
    });
  });
});
