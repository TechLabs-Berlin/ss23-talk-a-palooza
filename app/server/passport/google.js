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
    const googleId = profile.id;
    const email = profile.emails[0].value;
    const displayName = profile.displayName;
    const firstName = profile.name.givenName;
    const lastName = profile.name.familyName;
    const profilePhoto = profile.photos[0].value;
    const source = 'google';

    const currentUser = await UserService.getUserByEmail({
      email,
    });

    if (!currentUser) {
      const newUser = await UserService.addGoogleUser({
        googleId,
        email,
        firstName,
        lastName,
        displayName,
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

    return done(null, currentUser);
  }
);

passport.use(googleLogin);
