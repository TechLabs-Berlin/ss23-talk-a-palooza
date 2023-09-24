const passport = require('passport');
const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.googleId);
});

passport.deserializeUser(async (googleId, done) => {
  const currentUser = await User.findOne({ googleId });
  done(null, currentUser);
});
