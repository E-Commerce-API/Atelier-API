const mongoose = require('mongoose');
const Schema = mongoose.Schema

let questionSchema = new Schema({
  product_id: Number,
  question_id: Number,
  question_body: String,
  asker_name: String,
  question_helpfulness: Number,
  report: Boolean,
  answers: [{
    body: String,
    question_id: Number,
    date_written: Date,
    answerer_name: String,
    helpfulness: Number,
    report: Boolean,
    photos: [{
      answer_id: Number,
      id: Number,
      url: String
    }]
  }]
})

let models = mongoose.model('models', questionSchema, 'models');
module.exports = models;