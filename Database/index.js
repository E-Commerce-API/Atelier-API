const fs = require('fs');
const path = require('path');
const csv = require('fast-csv')
const { Questions } = reuqire('./Questions.js')
const filePath = path.join(__dirname, '../data/questions.csv')

// const readStream = fs.createReadStream(filePath, {encoding: 'utf8'});

// var chunkArray = [];

// readStream.on('data', (chunk) => {
//   chunkArray.push(chunk);
//   if (chunkArray.length > 100000) {
//     Questions.collection.insertMany(chunkArray, { ordered: false})
//     chunkArray = []
//   }
// });

// readStream.on('end', () => {
//   Questions.collection.insertMany(chunkArray, { ordered: false})
//     .then(() => {
//       console.log('done');
//     })
// })


/*
var bulk = Answer.collection.initializeOrderedBulkOp();
var lineRemainder = '';
var count = 0;
readStream.on('data', (chunk) => {
  let lines = chunk.split('\n');
  lines[0] = lineRemainder + lines[0];
  lineRemainder = lines.pop();
  count++;
  lines.forEach( async (line) => {
    line = line.split(',');
    try {
      let answers = new model.Answer({
        question_id: lines[1],
        body: lines[2],
        date_written: lines[3],
        answerer_name: lines[4],
        helpfulness: lines[7],
        report: lines[6]
      })
      let newAnswer = await answers;
      let saveAnswer = await newAnswer.save();
    } catch (err) {
      console.log(err)
    }
  })
});

readStream.on('end', () => {
  console.log(count);
})
*/