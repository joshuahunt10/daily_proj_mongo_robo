const express = require('express');
const router = express.Router();
// const data = require('../models/data.js');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var url = 'mongodb://localhost:27017/robots';



router.get('/', function (req, res) {
  MongoClient.connect(url, function(err, db) {
   if (err) {
     throw err;
   } else {
     console.log('Successfully connected to the database');
   }

   db.collection('users')
   .find()
   .toArray(function(err, documents){
     res.render('index', {data: documents})

   })
 })

});

router.get('/:id', function(req, res){
  var id = parseInt(req.params.id);
  MongoClient.connect(url, function(err, db) {
   if (err) {
     throw err;
   } else {
     console.log('Successfully connected to the database');
   }
   db.collection('users')
   .find({id: id})
   .toArray(function(err, documents){
      console.log(documents);
      res.render('profile', {data: documents})
   })
})



})

module.exports = router;
