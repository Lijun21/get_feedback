const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin'); 
const requireCredit = require('../middlewares/requireCredit');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

// a lot of serious project, we all start with the backend desgin first, 
// this post request, customer will pass array of emails through form, so recipients subdoc collection, is array of objects!,
//we need to transfer array of string to array of objects
//forigner key is not somthing generated automatically, you need to actually fill it out during creation. 
//when ever you create a new survey you need to pass it's user's user id to it.
//but the primary key is automatilly generated by mongoose/mongo/FileMaker, req.user.id,
module.exports = app => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for voting');
    });

    app.post('/api/surveys', requireLogin, requireCredit, async (req, res) => {
        const {title, subject, body, recipients } = req.body;

        //create a new instance of our survey model, we have not save it yet
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({email : email.trim() })),
            _user: req.user.id,
            dataSent: Date.now()
        });

        const mailer = new Mailer(survey, surveyTemplate(survey));
        try{
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
        } catch(err) {
            res.status(422).send(err);
        }
    });
}


//survey = {title:'hahhahahha', subject:'this is from lijun', body:'what is going on', recipients:'joannawang91@hotmail.com'}
//axios.post('/api/surveys', survey)