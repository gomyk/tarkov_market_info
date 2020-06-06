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
  Price.find({}, ['name', 'price'], {
    skip: 0, // Starting Row
    limit: 100, // Ending Row
    sort: {
      time: -1,
      price: -1
    }
  }, function (err, doc) {
    if (err) {
      res.send(500, err);
      return;
    }
    res.send(200, doc);
  });
});
module.exports = router;
