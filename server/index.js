const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();
require('./routes/authRoutes')(app);

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);


const PORT = process.env.PORT || 5000;
app.listen(PORT);
