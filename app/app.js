var express = require('express');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

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
//app.use(favicon(__dirname + '/../client/source/img/favicon/favicon.ico'));

//indexes pages (languages)


//Errors
//app.use(errors.e404);
//app.use(errors.render);

module.exports = app;