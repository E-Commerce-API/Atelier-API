const fs = require('fs');
const path = require('path');
const csv = require('fast-csv')
const {Answers} = require('./Answers.js')
const {Photos} = require('./Photos.js')

const filePath = path.join(__dirname, '../data/questions.csv')

var chunkArray = [];
const readStream = fs.createReadStream(filePath, {encoding: 'utf8'});
  .pipe(csv.parse({headers: true}))
  .on('data', async (chunk) => {
    let photos = new Photos({
      answer_id: data.answer_id,
      url: data.url;
    })
    if (chunkArray.length === 1000) {
      readStream.pause();
      (async () => {
        await chunkArray.forEach(async photo => {
          let findAnswer = await Answers.updateOne(
            { answer_id: photo.answer_id },
            {$push: {photos: photo}}
          )
        })
      })()
      let timeElasped = new Date() - startTime;
      chunkArray = [];
      readStream.resume();
    } else {
      chunkArray.push(photo);
    }
})
  .on('end', async () => {
    if (array.length) {
      (async () => {
        await chunkArray.forEach(async photo => {
          let findAnswer = await Answers.updateOne(
            { answer_id: photo.answer_id },
            {$push: {photos: photo}}
          )
        })
      })()
      chunkArray = [];
    }
    console.log('imported')
  })


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
