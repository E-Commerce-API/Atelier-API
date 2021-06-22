const express = require('express');
const db = require('./Database');
let app = express();

app.use(express.json());
let port = process.env.PORT || 3030;

app.listen(port, function() {
  console.log(`listening on port ${port}`)
})