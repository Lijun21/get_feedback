const passport = require('passport');

 //authenticate requests.
module.exports = (app) => {
    //access /auth/google, and redirect it to passport google strategy reqest
    app.get('/auth/google', 
        passport.authenticate('google', {
        scope: ['profile', 'email']
    }))

    // after user authorize we get code from google, then send the code to google to require user profile 
    //it will be picked by the same '/auth/google', the req would go look proxy in package.josn file, then proxy send it to target
    app.get('/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');//redirect send back to browser, the root route of our app,
            // we are going to localhost:3000/surveys, not :5000
        }
    );

    app.get('/api/logout', (req, res) => {
        //passport automatically attaches req.user, also req.logout() related to user authentication, kill cookie that's in the browser
        req.logout();
        res.redirect('/');// we are going to localhost:3000/surveys, not :5000
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
        // res.send(req.session);
    });

}
