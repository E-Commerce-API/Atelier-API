const mongoose = require('mongoose');
const Schema = mongoose.Schema

let questionSchema = new Schema({
  product_id: Number,
  question_id: Number,
  question_body: String,
  asker_name: String,
  question_helpfulness: Number,
  report: Boolean
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer'}]
})

let answerSchema = new Schema({
  body: String,
  date: Date,
  answerer_name: String,
  helpfulness: Number,
  report: Boolean
  photos: [{ type: Schema.Types.ObjectId, ref: 'Photo'}]
})

let photoSchema = new Schema({
  id: Number,
  url: String
})

module.exports = mongoose.model('Question', questionSchema);
module.exports = mongoose.model('Answer', answerSchema);
module.exports = mongoose.model('Photo', photoSchema);