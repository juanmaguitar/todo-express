var express = require('express');
var routes = require('./routes');
var tasks = require('./routes/tasks');
var http = require('http');
var path = require('path');
var app = express();

var favicon = require('serve-favicon'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  errorHandler = require('errorhandler');

var PORT = process.env.PORT || 3000;

app.locals.appname = 'Express.js Todo App'
app.locals.moment = require('moment');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));

app.use( require('less-middleware')(path.join(__dirname, 'public')) );
app.use( express.static(path.join(__dirname, 'public')) );

app.param('task_id', function(req, res, next, taskId) {
  req.taskId = taskId;
  return next();
});

app.get('/', routes.index);
app.get('/tasks', tasks.list);
app.post('/tasks', tasks.markAllCompleted)
app.post('/tasks', tasks.add);
app.post('/tasks/:task_id', tasks.markCompleted);
app.delete('/tasks/:task_id', tasks.del);
app.get('/tasks/completed', tasks.completed);

app.all('*', function(req, res){
  res.status(404).send();
})

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.listen( PORT, function(){
  console.log('Express server listening on port ' + PORT);
});
