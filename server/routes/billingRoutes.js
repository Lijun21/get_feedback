var keys = require('../config/keys');
var stripe = require("stripe")(keys.stripeSecretKey);
var requireLogin = require('../middlewares/requireLogin');

//stripe lib create a promise every time we create a charge, so use async/await
module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        stripe.setPublishableKey('pk_test_WVNWkintSeScNUDsSAT1AKQm');
        const charge = await stripe.charges.create({
            amount: 999,
            currency: 'usd',
            description: '$999 for 999 credit',
            source: req.body.id,
        });
        //req.user is set up by passport , just modify it just get saved in db
        req.user.credit += 999;
        const user = await req.user.save();//take the model then persist it to our db, 
        //it's async request, take some amount of time. user1 and user2 are completely separate object in memery;
        res.send(user);
    });
}