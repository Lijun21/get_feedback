var keys = require('../config/keys');
var stripe = require("stripe")(keys.stripeSecretKey);
var requireLogin = require('../middlewares/requireLogin');


//why we don't use the token passed by axio.post????
//stripe lib create a promise every time we create a charge, so use async/await
module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credit',
            source: req.body.id
        });
        //req.user is set up by passport , just modify it just get saved in db
        req.user.credits += 5;
        const user = await req.user.save();//take the model then persist it to our db, 
        //it's async request, take some amount of time. user1 and user2 are completely separate object in memery;
        res.send(user);
    });
}