//commenJS modules
const express = require('express');
const passport = require('passport');

require('./services/passport');

const app = express();

app.get('/auth/google', 
    passport.authenticate('google', {
    scope: ['profile', 'email']
}))

app.get(
    '/auth/google/callback',
    passport.authenticate('google')
);


const PORT = process.env.PORT || 5000;
app.listen(PORT);
