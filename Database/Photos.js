const mongoose = require('mongoose');
const Schema = mongoose.Schema

let photoSchema = new Schema({
  id: Number,
  answer_id: Number,
  url: String
})

let Photos = mongoose.model('Photos', photoSchema, 'Photos');

module.exports = Photos;