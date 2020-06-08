var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');
var request = require('request');
var indexRouter = require('./routes/index');
var serveIndex = require('serve-index');
var serveStatic = require('serve-static');
var mongoose = require('mongoose');
var Price = require('./models/price.js');

var interval = null;

var app = express();
var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
    console.log("Connected to mongo server");
});

mongoose.connect('mongodb://localhost:27018/logging');

const PORT = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error.html');
});

const options = {
    uri: "https://tarkov-market.com/api/v1/items/all",
    headers: {
        'x-api-key': 'eluBm1haTR4aYvXY'
    }
};
var time = null;
startLogging();
interval = setInterval(() => {
    startLogging();
}, 1000 * 60 * 60 * 2); //2 hours

function startLogging() {
    time = Date.now();
    console.log(time + ' : start Update DB');

    request(options, function(err, response, body) {
        var obj = JSON.parse(body);
        console.log(obj.length);
        obj.forEach(doc => {
            doc.timestamp = time;
            var price = new Price(doc);
            price.save(function(err, object) {
                if (err) {
                    return console.log(err);
                }
                console.log('[' + time + '] item name: ' + object.name + ' , logging success');
            });
        });
    })
}
module.exports = app;
