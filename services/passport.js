const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');


const User = mongoose.model('users');

//user model and done argument, 
//when user sign in website, we check if user exist first, then we send data, *also set cookie inside of browser
//so next time brower will automatically sign in this user base on the cookie, to deserialize User, fetch the user's data

//data to cookie
passport.serializeUser((user, done) => {
  //user.id is the piece of info we store in cookie session to identify user
  done (null, user.id);
});

//id is the token we gernerated when serializeUse, we turn id to user
//cookie to data
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
        // hey google strategy, if our request run through any proxy, that's fine, just trust it and calculate the call back URL correctly, https not http
        proxy: true
      },
    //accessToken is the key to get access to the same google account, refreshToken refresh accessToken, accessToken expires after certain amount of time
      async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({googleId: profile.id});
        if (existingUser){
          //done tell passport you are done with checking and return what you get
          return done(null, existingUser);
        }
         // create a new mogoose model instance, use promises.save()
          const user = await new User({ googleId: profile.id }).save();
          done(null, user);
      }
    )
  );
