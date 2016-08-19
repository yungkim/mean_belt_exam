const session = require('express-session')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const favicon = require('serve-favicon')
const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 8000


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json()) // render json

app.use(session({
 secret:'somesecrettokenhere',
 resave: false,
 saveUninitialized: true,
 maxAge: 5000000
}));

app.use(express.static(path.join(__dirname, './client')))
app.use(express.static(path.join(__dirname, './bower_components')))
app.use(favicon(__dirname + '/client/public/favicon.ico'));

require('./server/config/mongoose.js') // load mongoose connector
require('./server/config/routes.js')(app) // load router

app.listen(port, ()=>{console.log('Server running on port#', port )}) // start server