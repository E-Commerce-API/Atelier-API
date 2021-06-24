const mongoose = require('mongoose');
const Schema = mongoose.Schema


let questionSchema = new Schema({
  product_id: Number,
  question_id: Number,
  question_body: String,
  asker_name: String,
  question_helpfulness: Number,
  report: Boolean,
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer'}]
})

let Question = mongoose.model('Question', questionSchema, 'Question');


let answerSchema = new Schema({
  question_id: Number,
  body: String,
  date_written: Date,
  answerer_name: String,
  helpfulness: Number,
  report: Boolean,
  photos: [{ type: Schema.Types.ObjectId, ref: 'Photo'}]
})

let Answer = mongoose.model('Answer', answerSchema, 'Answer');


let photoSchema = new Schema({
  id: Number,
  url: String
})

let Photo = mongoose.model('Photo', photoSchema, 'Photo');


module.exports = {
  Question: Question,
  Answer: Answer,
  Photo: Photo
}
