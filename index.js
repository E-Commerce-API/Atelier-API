var bodyParser = require('body-parser')
const express = require('express');
const db = require('./database/controllers.js');
const {getQuestions, getAnswers, addQuestion, addAnswer} = require('./database/controllers.js')
let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


app.get('/qa/questions', (req, res) => {
  db.getQuestions()
  .then(result => {
    res.status(200).send(result);
  })
  .catch(err => {
    res.status(404).send(err);
  })
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  db.getAnswers()
  .then(result => {
    res.status(200).send(result);
  })
  .catch(err => {
    res.status(404).send(err);
  })
});

app.post('/qa/questions', (req, res) => {

});

app.post('/qa/questions/:question_id/answers', (req, res) => {

});

app.put('/qa/questions/:question_id/helpful', (req, res) => {

});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {

});

app.put('/qa/answers/:answer_id/report', (req, res) => {

});



/*
mongoimport --db sdcproducts --collection Styles --type csv --headerline --ignoreBlanks --file /home/scottprovence/rfe3/SDC/ProductsAPI/raw_data/styles.csv
*/




let port = process.env.PORT || 3030;

app.listen(port, function() {
  console.log(`listening on port ${port}`)
})