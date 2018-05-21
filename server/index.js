const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

//middleware setup, use cookie session to handle cookie
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
//tell express and passprot that you need to use cookie session
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

//Heroku would set up process.env.PORT automatically for us
const PORT = process.env.PORT || 5000;
app.listen(PORT);


