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
  Price.find({}, function (err, doc) {
    if (err) {
      console.log(err);
      res.send(500, err);
      return;
    }
    res.send(200, doc);
  });
});

router.get('/db/latest', function (req, res, next) {
  Price.find({}, ['name', 'shortName', 'traderName', 'traderPrice', 'price', 'icon', 'timestamp', 'updated'], {
    skip: 0,
    limit: 2000,
    sort: {
      timestamp: -1
    }
  }, function (err, doc) {
    if (err) {
      console.log(err);
      res.send(500, err);
      return;
    }
    var mp = new Map();
    var new_doc = [];
    doc.forEach(d => {
      if (!mp.has(d.name)) {
        mp.set(d.name, true);
        new_doc.push(d);
      }
    });
    res.send(200, new_doc);
  });
});
module.exports = router;


