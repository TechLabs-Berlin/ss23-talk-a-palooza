const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const UserService = require('../controllers/userService');

const googleLogin = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL_DEV}/api${process.env.GOOGLE_CALLBACK_URL}`,
    proxy: true,
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    const id = profile.id;
    const email = profile.emails[0].value;
    const firstName = profile.name.givenName;
    const lastName = profile.name.familyName;
    const profilePhoto = profile.photos[0].value;
    const source = 'google';

    const currentUser = await UserService.getUserByEmail({
      email,
    });

    if (!currentUser) {
      const newUser = await UserService.addGoogleUser({
        id,
        email,
        firstName,
        lastName,
        profilePhoto,
        source,
      });
      console.log(newUser);
      return done(null, newUser);
    }

    if (currentUser.source != 'google') {
      //return error
      return done(null, false, {
        message: `You have previously signed up with a different signin method`,
      });
    }

    currentUser.lastVisited = new Date();
    return done(null, currentUser);
  }
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const currentUser = await User.findOne({ id });
  done(null, currentUser);
});

passport.use(googleLogin);
