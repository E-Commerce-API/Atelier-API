const mongoose = require('mongoose');
const Model = require('./models.js')
const Answers = require('./Answers.js')
mongoose.set('useFindAndModify', false);

let getQuestions = async (req, res) => {
  let id = req.query.product_id;
  let page = req.query.page || 0;
  let count = req.query.count || 5;
  let response = {
    product_id: id,
    page: page,
    count: count,
    results: []
  }

  let questions = await Model.find({product_id: id}, {_id: 0})

  if (!questions.length) {
    return response;
  } else {
    response.results.push(...questions)
    return response;
  }

}

let getAnswers = async (req, res) => {
 let id = req.params.question_id;
 let page = req.params.page || 0;
 let count = req.params.count || 5;
 let response = {
   question: id,
   page: page,
   count: count,
   results: []
 }

 let answers =  await Model.find({question_id: id}, {_id: 0})

if (!answers.length) {
  return response;
} else {
  response.results.push(...answers)
  return response;
}
}

/*
{
    product_id: req.body.product_id,
    question_id: req.body.question_id,
    question_body: req.body.question_body,
    asker_name: req.body.asker_name,
    question_helpfulness: req.body.question_helpfulness,
    report: false
  }


  {
    question_id: req.body.question_id,
    body: req.body.body,
    date_written: req.body.date_written,
    answerer_name: req.body.answerer_name,
    helpfulness: req.body.helpfulness,
    report: req.body.report,
    photos: req.body.photos
  }
*/
let saveQuestion = (req, res) => {
  // var id = req.params.product_id;
  var updateQuetionId = Model.update(
    { product_id: req.params.product_id},
    {$inc: {question_id: 1}}
  )
  var newQuestion = new Model({
    product_id: req.params.product_id,
    question_id: updateQuetionId,
    question_date: new Date().toISOString(),
    question_body: req.body.question_body,
    asker_name: req.body.asker_name,
    question_helpfulness: req.body.question_helpfulness,
    report: false
  })
  console.log('newQuestion', newQuestion)
  // console.log(req.body)
  // Model.update(
  //   {'product_id': Number(id)},
  //   { $push: { results: req.body}},
  //   function(err,result) {
  //     if (err) {
  //       res.status(500).send(err);
  //      } else {
  //        res.status(201).json(result);
  //      }
  //   }
  // );
  newQuestion.save(function(err, result) {
    if (err) {
      res.status(500).send(err);
     } else {
       res.status(201).json(result);
     }
  });
}

let saveAnswer = (req, res) => {
  var id = req.params.question_id;
  Model.updateOne(
    {'question_id': Number(id)},
    { $push: { answers: req.body, $inc: {'answers.answer_id': 1}} },
    function(err,result) {
      if (err) {
        res.status(500).send(err);
       } else {
         res.status(201).json(result);
       }
    }
  );

};

let updateHelpfulness = (req, res) => {
  var query = {'question_id': req.params.question_id};
  var updateByOne = {'$inc' : {question_helpfulness: 1}};
  Model.findOneAndUpdate(query, updateByOne, {new: true} , (err, result) => {
    if (err) {
      res.status(500).send(err)
    } else {
     res.status(200).send(result);
    }
  })
}

let updateAnswerHelpful = (req, res) => {
  var questionId = req.params.question_id;
  var paramId = req.params.answer_id;
  var query = {'answers.answer_id': Number(paramId)};
  var updateHelpful = {$inc : {'answers.$.helpful': 1}}
  Model.updateOne(query, updateHelpful, {new: true} , (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(result);
     res.status(200).send(result);
    }
  })

}

let updateAnswerReport = (req, res) => {
  var paramId = req.params.answer_id;
  var query = {'answers.answer_id': Number(paramId)};
  var updateHelpful = {'reported': true}
  Model.updateOne(query, updateHelpful, {new: true} , (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(result);
     res.status(200).send(result);
    }
  })
}

module.exports = {
  getQuestions,
  getAnswers,
  saveQuestion,
  saveAnswer,
  updateHelpfulness,
  updateAnswerHelpful,
  updateAnswerReport
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

/*
let answers = await Answers.find({question_id: id})
  .skip(page * count)
  .limit(count)
  .aggregate([{
    '$lookup': {
      from: "Photos",
      localField: "id",
      foreignField: "answer_id",
      as: "photos"
    }
  }])
console.log('answers', answers)
if (!answers.length) {
  res.json(response).end();
} else {
  response.results.push(...answers)
  res.json(response).end();
}
*/

/*
let questions = await db.collection('Questions').aggregate([
    {
      '$match': { "$product_id": id}
    }, {
    '$lookup': {
      from: 'Answers',
      localField: 'id',
      foreignField: 'question_id',
      as: 'answers'
    }
  },{
    '$unwind': {
      path: '$answers',
      preserveNullAndEmptyArrays: true
    }
  }, {
    '$lookup': {
      from: 'Photos',
      localField: 'answers.id',
      foreignField: 'answer_id',
      as: 'answers.photos'
    }
  }, {
    '$group': {
      _id: '$id',
      product_id: {
        '$first': '$product_id'
      },
      body: {
        '$first': '$body'
      },
      question_date: {
        '$first': '$date_written'
      },
      reported: {
        '$first': '$reported'
      },
      helpfulness: {
        '$first': '$helpful'
      },
      answers: {
        '$push': '$answers'
      }
    }
  }])
*/
// .aggregate([{
//   '$lookup': {
//     from: 'Answers',
//     let: { 'question_id': 'id' },
//     pipeline: [
//       {'$match': { '$expr': {'$eq': ['$question_id', '$$question_id']}}},
//       {'$lookup': {
//         from: 'Photos',
//         let: { 'answer_id' : 'id'},
//         pipeline: [
//           {'$match': { '$expr': { '$eq': ['$answer_id', '$$answer_id']}}}
//         ],
//         as: 'answers'
//       }}
//     ],
//     as: 'answers'
//   }},
//   {'$unwind': 'answers'}
// ])

/* {
  $match: { product_id: 4 }
  },
  */

/* {
  $group: {
    _id: '$id',
    answer_id: {
      $first: '$id'
    },
    question_id: {
      $first: '$id'
    },
    body: {
      $first: '$body'
    },
    date_written: {
      $first: '$date_written'
    },
    answerer_name: {
      $first: '$answerer_name'
    },
    reported: {
      $first: '$reported'
    },
    helpful: {
      $first: '$helpful'
    }
  }
}*/

// db.Questions.aggregate([
//  {
//   $lookup: {
//     from: 'Answers',
//     localField: 'id',
//     foreignField: 'question_id',
//     as: 'answers'
//   }
// }, {
//   $unwind: {
//     path: '$answers',
//     preserveNullAndEmptyArrays: true
//   }
// }, {
//   $lookup: {
//     from: 'Photos',
//     localField: 'answers.answer_id',
//     foreignField: 'answer_id',
//     as: 'answers.photos'
//   }
// }, {
//   $group: {
//     _id: '$id',
//     question_id: {
//       $first: '$id'
//     },
//     product_id: {
//       $first: '$product_id'
//     },
//     question_body: {
//       $first: '$body'
//     },
//     question_date: {
//       $first: '$date_written'
//     },
//     asker_name: {
//       $first: '$asker_name'
//     },
//     reported: {
//       $first: '$reported'
//     },
//     question_helpfulness: {
//       $first: '$helpful'
//     },
//     answers: {
//       $push: '$answers'
//     }
//   }
// },
// {$out: 'finalFinalCollection'}
// ], {allowDiskUse: true})

