let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')

//connect to the database
import {connect} from './src/javascripts/config/db/connect'
connect("mongodb://localhost:27017/mycourses")

//create a web server
export let app = express()

app.set('views', path.join(__dirname, "src", "javascripts", "views"))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//authentication
import passport from 'passport'
import {strategy} from './src/javascripts/config/passport'
passport.use(strategy)
app.use(passport.initialize())

//routing
import {configureRoutes} from './src/javascripts/config/routes'
configureRoutes(app)

//handle errors
app.use(function(req, res, next) {
  res.render('layout', {content: 'error', err: createError(404), title: 'There was an error' })
})

app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('layout', {content: 'error', err: err, title: 'There was an error' }, )
})

//create the web server
let http = require('http')
let server = http.createServer(app)
server.listen(process.env.PORT || '8080')
server.on('error', err => {
  throw err
})

server.on('listening', () => {
  let address = server.address()
  let bind = typeof address === 'string' ? address : address.port
  console.log('Listening on ' + bind)
})