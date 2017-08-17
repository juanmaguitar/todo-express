const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const moment = require('moment')

const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')


const app = express()

const PORT = 3002
const URL_DB = process.env.URL_DB || 'mongodb://localhost:27017/test2'

const routesTasks = require('./routes/tasks')
const routesTask = require('./routes/task')

mongoose.promise = global.Promise
mongoose.connect(URL_DB, {useMongoClient: true})

app.set('view engine', 'pug')

app.use(express.static(path.join(process.cwd(), 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.locals.moment = moment
app.locals.maxTasks = 10

app.use(cookieParser())
app.use(session({
  secret: 'cualquierpalabraquesenosocurra',
  resave: true,
  saveUninitialized: true
}))
app.use(flash())

app.use('/tasks', routesTasks)
app.use('/task', routesTask)

app.listen(PORT)
console.log(`Listening on PORT ${PORT}`)
