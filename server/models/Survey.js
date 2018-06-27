const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

//we have a limit total of xxx memory to use....
//it's all about physical limitation of mongoDB, so we don't create survey inside user colletion
const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yes: {type: Number, default: 0},
    no: {type: Number, default: 0},
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    dataSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', surveySchema);