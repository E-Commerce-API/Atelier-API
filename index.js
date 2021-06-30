require('newrelic');
var bodyParser = require('body-parser')
const express = require('express');
const {getQuestions, getAnswers, saveQuestion, saveAnswer, updateHelpfulness, updateAnswerHelpful, updateAnswerReport} = require('./database/controllers.js')
let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// app.get('/qa/questions', (req, res) => {
//   getQuestions(req, res)
//   .then(result => {
//     return res.send(result);
//   })
//   .catch(err => {
//     return res.send(err);
//   })
// });
app.get('/qa/questions', getQuestions);
app.get('/qa/questions/:question_id/answers', (req, res) => {
  getAnswers(req, res)
  .then(result => {
    return res.status(200).send(result);
  })
  .catch(err => {
    res.status(404).send(err);
  })
});

app.post('/qa/questions', saveQuestion);

app.post('/qa/questions/:question_id/answers', saveAnswer)

app.put('/qa/questions/:question_id/helpful', updateHelpfulness);

app.put('/qa/answers/:answer_id/helpful',updateAnswerHelpful);

app.put('/qa/answers/:answer_id/report', updateAnswerReport);


let port = process.env.PORT || 3030;


app.listen(port, function() {
  console.log(`listening on port ${port}`)
})