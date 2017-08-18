const MongoClient = require('mongodb').MongoClient
const express = require('express')
const path = require('path')

// const favicon = require('serve-favicon')
const logger = require('morgan')
const bodyParser = require('body-parser')
const errorHandler = require('errorhandler')

const routerTasks = require('./routes/tasks')
const PORT = process.env.PORT || 3000

const app = express()

app.locals.appname = 'Express.js Todo App'
app.locals.moment = require('moment')

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'jade')
app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: true}))

app.use(require('less-middleware')(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

// development only
if (app.get('env') === 'development') {
  app.use(errorHandler())
}

const urlDb = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo'
console.log('connect to ' + urlDb)

MongoClient.connect(urlDb, function (err, db) {
  if (err) throw err

  console.log('connected!')
  app.use('/', routerTasks(db))

  app.get('/', function (req, res) {
    res.redirect('/tasks')
  })

  app.all('*', function (req, res) {
    res.status(404).send()
  })

  app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`)
  })
})
