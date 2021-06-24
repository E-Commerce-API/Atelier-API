const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SDC', {useNewUrlParser: true, useUnifiedTopology: true });
var model = require('./models.js')


let getQuestions = (req, res) => {
  console.log('what is req?', req)
  return model.Question.find({ product_id: req.params.product_id});
}

let getAnswers = (req, res) => {
  return model.Answer.find({question_id: req.params.question_id});
}



let addQuestion = () => {
  var newQuestion = new model.Question({
    product_id: req.body.product_id,
    question_id: req.body.question_id,
    question_body: req.body.question_body,
    asker_name: req.body.asker_name,
    question_helpfulness: req.body.question_helpfulness,
    report: false,
    answers: []
  })
  newQuestion.save(function(err, res) {
    if (err) {
      return console.log('error', err);
    }
    console.log('question saved');
  });
}

let addAnswer = () => {
  var newAnswer = new model.Answer({
    question_id: req.body.question_id,
    body: req.body.body,
    date_written: req.body.date_written,
    answerer_name: req.body.answerer_name,
    helpfulness: req.body.helpfulness,
    report: req.body.report,
    photos: []
  })
  newAnswer.save(function(err, res) {
    if (err) {
      return console.log('error', err);
    }
    console.log('question saved');
  });
}

//----------------------------------------------------------------------------------
// var testAnswer = new model.Answer({
//   body: "This is an answer for testing",
//   date_written: "2021-06-23T00:00:00Z",
//   answerer_name: "tester",
//   helpfulness: 0,
//   report: false,
//   photo: []
// })

// let addAnswer = () => {
//   testAnswer.save(function(err, res) {
//     if (err) {
//       return console.log('error', err);
//     } else{
//       console.log('answer saved');
//     }
//   })
// }

// addAnswer();


module.exports = {
  getQuestions,
  getAnswers,
  addQuestion,
  addAnswer
}