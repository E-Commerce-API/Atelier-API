const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SDC', {useNewUrlParser: true, useUnifiedTopology: true });
let Questions = require('./Questions.js');
let Answers = require('./Answers.js');
let Photos = require('./Photos.js');

db.Questions.aggregate([{
  $lookup: {
    from: 'Answers',
    localField: 'id',
    foreignField: 'question_id',
    as: 'answers'
  }
},{
  $unwind: {
    path: '$answers',
    preserveNullAndEmptyArrays: true
  }
}, {
  $lookup: {
    from: 'Photos',
    localField: 'id',
    foreignField: 'answer_id',
    as: 'answers.photos'
  }
}, {$out: "output"}
])

let getQuestions = (req, res) => {
  Questions.aggregate([{
    $lookup: {
      from: 'Answers',
      let: { 'question_id': 'id' },
      pipeline: [
        {$match: { $expr: {$eq: ['$question_id', '$$question_id']}}},
        {$lookup: {
          from: 'Photos',
          let: { 'answer_id' : 'id'},
          pipeline: [
            {$match: { $expr: { $eq: ['$answer_id', '$$answer_id']}}}
          ],
          as: 'answers'
        }}
      ],
      as: 'answers'
    }},
    {$unwind: 'answers'}
])
}

let getAnswers = async (req, res) => {
 let answers = await Answers.aggregate([{
   $lookup: {
     from: "Photos",
     localField: "id",
     foreignField: "answer_id",
     as: "photos"
   }
 }], (err, response) => {
   if (err) {
     res.send(err);
   } else {
    res.send(response);
   }
 })
}


let addQuestion = () => {
  var newQuestion = new Questions({
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
  var newAnswer = new Answers({
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