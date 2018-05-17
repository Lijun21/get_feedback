const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');


passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        // proxy: true
      },
    //  accessToken is the key to get access to the same google account
    //refreshToken refresh accessToken, accessToken expires after certain amount of time
      (accessToken, refreshToken, profile, done) => {
        console.log("accessToken:", accessToken);
        console.log("refreshToken:", refreshToken);
        console.log("profile:", profile);
      }
    )
  );
  