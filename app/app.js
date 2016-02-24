var express = require('express');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var errors = require('./routes/errors');
var render = require('./basis/render');
var adding = require('./routes/adding');
var completion = require('./routes/completion');
var ordering = require('./routes/ordering');

var app = express();

//render templates
app.set('view engine', 'jade');
app.set('views', __dirname +  '/../client/view');

//POST request and cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//favicon
app.use(favicon(__dirname + '/../client/source/images/favicon/favicon.ico'));

//public source
app.use('/src', express.static(__dirname + '/../client/source'));

//index page
app.get('/', render('main/index'));

//add bot account
app.get('/adding', render('main/adding'));
app.post('/adding', adding);

//completion payment
app.post('/completion', completion);

//creating new order
app.post('/ordering', ordering);

//errors
app.use(errors.e404);
app.use(errors.render);

module.exports = app;