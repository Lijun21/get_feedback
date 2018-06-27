const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
var bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

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

//the require will retrun a js function and immediatly get called with app as parameter
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

//** all the routes will be served by the order of operation, form top down, authRoutes then authRoutes then client/build then you get index.html file
if (process.env.NODE_ENV === 'production'){
    //express will serve up production assets, like main.js file or main.css file
    //if any routes come to our server, that do not handle by authRoutes and billingRoutes, 
    //then look into client/build dir to see if anything match here to serve
    app.use(express.static('client/build'));

    //Express will serve up the index.html file if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//Heroku would set up process.env.PORT automatically for us
const PORT = process.env.PORT || 5000;
app.listen(PORT);


