var bodyParser = require('body-parser')
const express = require('express');
const db = require('./database/controllers.js');
const {getQuestions, getAnswers, saveQuestion, saveAnswer} = require('./database/controllers.js')
let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


app.get('/qa/questions', (req, res) => {
  getQuestions(req, res)
  .then(result => {
    return res.send(result);
  })
  .catch(err => {
    return res.send(err);
  })
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  db.getAnswers()
  .then(result => {
    return res.status(200).send(result);
  })
  .catch(err => {
    res.status(404).send(err);
  })
});

app.post('/qa/questions', (req, res) => {
  db.saveQuestion(req.body)
  .then(() => {
    res.status(201).send('Success')
  })
  .catch((err) => {
    res.status(404).send(err)
  })
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  db.saveQuestion(req.body)
  .then(() => {
    res.status(201).send('Success')
  })
  .catch((err) => {
    res.status(404).send(err)
  })
});

app.put('/qa/questions/:question_id/helpful', (req, res) => {

});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {

});

app.put('/qa/answers/:answer_id/report', (req, res) => {

});


let port = process.env.PORT || 3030;

app.listen(port, function() {
  console.log(`listening on port ${port}`)
})