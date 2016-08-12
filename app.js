var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var http = require('http');
var path = require('path');

var favicon = require('serve-favicon'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  errorHandler = require('errorhandler');

var routerTasks = require('./routes/tasks');
var PORT = process.env.PORT || 3000;


var app = express();

app.locals.appname = 'Express.js Todo App'
app.locals.moment = require('moment');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));

app.use( require('less-middleware')(path.join(__dirname, 'public')) );
app.use( express.static(path.join(__dirname, 'public')) );

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

var urlDb =  process.env.MONGODB_URI || 'mongodb://localhost:27017/todo';
var db = MongoClient.connect( urlDb )

console.log ("connect to " + urlDb)
db.then(function(db){

	console.log ("connected!")
	app.use ('/', routerTasks(db) );

	app.get ('/', function(req, res) {
		res.redirect('/tasks');
	} );

	app.all('*', function(req, res){
	  res.status(404).send();
	})

	app.listen( PORT, function(){
	  console.log('Express server listening on port ' + PORT);
	});

})




