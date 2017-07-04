const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
// const data = require('./models/data.js');

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');


const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.static(__dirname + '/public'));

const routes = require("./routes/index")
// const profileRoutes = require('./routes.profile') // TODO: wtf
app.use('/', routes);

var url = 'mongodb://localhost:27017/robots';

MongoClient.connect(url, function(err, db) {
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

// app.get('/', function (req, res) {
//   res.render('index', {data: data.users})
// });

// app.user('/:id' routes);


// app.get('/:id', function(req, res){
//   var id = req.params.id - 1d;
//
//   res.render('profile', {data:data.users[id]})
//
// })

app.listen(3000, function () {
  console.log('Autobots ride!')
});
