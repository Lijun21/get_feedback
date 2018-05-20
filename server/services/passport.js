const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');


const User = mongoose.model('users');

//user model and done argument
passport.serializeUser((user, done) => {
  //user.id is the piece of info we store in cookie session to identify user
  done (null, user.id);
});

//id is the token we gernerated when serializeUse, we turn id to user
passport.deserializeUser((id, done) => {
  //everytime that we access our mongoDB, it's an asynchronous action, we have to assume that we return an promise, resolve after the user with an given id is found
  User.findById(id).then(user => {
    done (null, user);
  });
});

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
        User.findOne({googleId: profile.id}).then(existingUser => {
          if (existingUser) {
            //done tell passport you are done with checking and return what you get
            done(null, existingUser);//the user exits, return, error and user record 
          }else {
            // create a new mogoose model instance, promises
            new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
          }
        })
      }
    )
  );
  