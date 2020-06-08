var express = require('express');
var router = express.Router();
var request = require('request');
var mongoose = require('mongoose');
var Price = require('../models/price.js');
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index.html');
});

router.get('/db', function (req, res, next) {
  Price.find({}, {
    skip: 0 // Starting Row
    //limit: 100, // Ending Row
//     sort: {
//       time: -1,
//       price: -1
//     }
  }, function (err, doc) {
    if (err) {
      console.log(err);
      res.send(500, err);
      return;
    }
    res.send(200, doc);
  });
});

router.get('/db/latest', function(req, res, next) {
    Price.find().distinct('name', function(err, doc) {
        if (err) {
            console.log(err);
            res.send(500, err);
            return;
        }
        res.send(200, doc);
    });
});
module.exports = router;


