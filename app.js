const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');


var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');


const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.static(__dirname + '/public'));

const routes = require("./routes/index")
app.use('/', routes);

var url = 'mongodb://localhost:27017/robots';

const mongoURL = process.env.MONGODB_URI || url

MongoClient.connect(mongoURL, function(err, db) {
  if (err) {
    throw err;
  } else {
    console.log('Successfully connected to the database');
  }
  const data = require("./data");
  for (var i = 0; i < data.users.length; i++) {
    const user = data.users[i];
    db.collection("users").updateOne(
      {id: user.id},
      user,
      {upsert: true}
    )
  }
})
const port = process.env.PORT || 3000;
app.listen(port)
