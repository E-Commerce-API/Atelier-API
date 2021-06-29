const mongoose = require('mongoose');
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost:27017/SDC', {useNewUrlParser: true, useUnifiedTopology: true });

let finalSchema = new Schema({
  product_id: Number,
  question_id: Number,
  question_body: String,
  asker_name: String,
  question_date: Date,
  question_helpfulness: Number,
  reported: Boolean,
  answers: [{
    answer_id: Number,
    body: String,
    question_id: Number,
    date_written: Date,
    answerer_name: String,
    answerer_email: String,
    helpful: Number,
    reported: Boolean,
    photos: [{
      answer_id: Number,
      id: Number,
      url: String
    }]
  }]
}, { collection: 'finalFinalCollection' } )

let Model = mongoose.model('Model', finalSchema, 'finalFinalCollection');

module.exports = Model;