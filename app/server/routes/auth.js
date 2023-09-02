const authRouter = require('express').Router();
const passport = require('passport');

authRouter.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'successful login',
      user: req.user,
      // cookies: req.cookies,
    });
  }
});

authRouter.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'login failed',
  });
});

authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL_DEV);
});

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: `${process.env.CLIENT_URL_DEV}/main`,
    failureRedirect: '/login/failed',
  })
);

module.exports = authRouter;
