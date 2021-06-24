const mongoose = require('mongoose');
const Schema = mongoose.Schema


let questionSchema = new Schema({
  product_id: Number,
  question_id: Number,
  question_body: String,
  asker_name: String,
  question_helpfulness: Number,
  report: Boolean,
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answers'}]
})

let Questions = mongoose.model('Questions', questionSchema, 'Questions');
module.exports = Questions;
