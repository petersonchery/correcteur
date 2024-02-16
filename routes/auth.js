var FacebookStrategy = require('passport-facebook');

passport.use(new FacebookStrategy({
    clientID: process.env['931451118616386'],
    clientSecret: process.env['FACEBOOK_APP_SECRET'],
    callbackURL: 'https://www.example.com/oauth2/redirect/facebook',
    state: true
  },
  function verify(accessToken, refreshToken, profile, cb) {
  }
));