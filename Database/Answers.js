const mongoose = require('mongoose');
const Schema = mongoose.Schema

let answerSchema = new Schema({
  question_id: Number,
  body: String,
  date_written: Date,
  answerer_name: String,
  helpfulness: Number,
  report: Boolean,
  photos: [{ type: Schema.Types.ObjectId, ref: 'Photos'}]
})

let Answers = mongoose.model('Answers', answerSchema, 'Answers');

module.exports = Answers;