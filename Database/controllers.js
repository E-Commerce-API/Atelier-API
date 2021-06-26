const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SDC', {useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
let Questions = require('./Questions.js');
let Answers = require('./Answers.js');
let Photos = require('./Photos.js');


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

  const agg = [
    {
      $match: { product_id: 2}
    }, {
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
      localField: 'answers.id',
      foreignField: 'answer_id',
      as: 'answers.photos'
    }
  }, {
    $group: {
      _id: '$id',
      product_id: {
        $first: '$product_id'
      },
      body: {
        $first: '$body'
      },
      question_date: {
        $first: '$date_written'
      },
      reported: {
        $first: '$reported'
      },
      helpfulness: {
        $first: '$helpful'
      },
      answers: {
        $push: '$answers'
      }
    }
  }]
  let questions = db.collection('testoutput').find('product_id': 2)

  questions.forEach(data => {
    console.log(data)
  })

  // await questions.toArray((err, result) => {
  //   if (err) {
  //     return err;
  //   }

  //   return result;
  // })

  if (!questions.length) {
    return response;
  } else {
    response.results.push(...questions)
    return response;
  }

}

let getAnswers = async (req, res) => {
  //find, createIndex question_id
  //aggregate, lookup the file and send the result back
 let id = req.body.question_id;
 let page = req.body.page || 0;
 let count = req.body.count || 5;
 let response = {
   question: id,
   page: page,
   count: count,
   results: []
 }

 let answers = await db.collection('Answers').aggregate([{
   '$match': {question_id: id}
 }, {
    '$lookup': {
      from: "Photos",
      localField: "id",
      foreignField: "answer_id",
      as: "photos"
    }
  }])

if (!answers.length) {
  return response;
} else {
  response.results.push(...answers)
  return response;
}
}


let saveQuestion = () => {
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

let saveAnswer = () => {
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

db.Questions.aggregate([
 {
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
    localField: 'answers.id',
    foreignField: 'answer_id',
    as: 'answers.photos'
  }
}, {
  $group: {
    _id: '$id',
    product_id: {
      $first: '$product_id'
    },
    body: {
      $first: '$body'
    },
    question_date: {
      $first: '$date_written'
    },
    reported: {
      $first: '$reported'
    },
    helpfulness: {
      $first: '$helpful'
    },
    answers: {
      $push: '$answers'
    }
  }
},
{$out: 'finaloutput'}
], {allowDiskUse: true})

module.exports = {
  getQuestions,
  getAnswers,
  saveQuestion,
  saveAnswer
}