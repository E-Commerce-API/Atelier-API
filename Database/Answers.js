const mongoose = require('mongoose');
const Schema = mongoose.Schema

let answerSchema = new Schema({
    answer_id: Number,
    body: String,
    question_id: Number,
    date_written: Date,
    answerer_name: String,
    answer_email: String,
    helpful: Number,
    reported: Boolean,
    photos: []
})

let Answers = mongoose.model('Answers', answerSchema, 'Answers');

module.exports = Answers;