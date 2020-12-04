const path = require('path')
const express = require('express')
const webpush = require('web-push')
const alarmRoutes = require('./routes/data')
const auth = require('./routes/api/auth')
const users = require('./routes/api/users')
const endpoints = require('./routes/api/endpoints')
const devices = require('./routes/api/devices')
const server = express()
const mongoose = require('mongoose')

require('dotenv').config()
const db = process.env.MONGOURI
const publicVapidKey = process.env.PUBLICVAPIDKEY
const privateVapidKey = process.env.PRIVATEVAPIDKEY

//middleware
server.use(express.static(path.join(__dirname, '../public')))
server.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
server.use(express.urlencoded({ extended: true }))
server.use(express.json())

//routes
server.use('/', alarmRoutes)
server.use('/api/users', users)
server.use('/api/auth', auth)
server.use('/api/endpoints', endpoints)
server.use('/api/devices', devices)

//connect to mongo atlas cloud DB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIdex: true
  })
  
  .then(() => console.log('Mongo Database connected'))
  .catch(err => console.log(err))

//Provide Vap ID cedentials 
webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

//Send Push notificantions 
server.post("/subscribe", (req, res,) => {
    let message = req.body.message                                                                      
    const subscription = req.body.subscription;
    res.status(201).json({});
    const payload = JSON.stringify({ title: "DeWaalTec Home alarm", body:message});
    webpush
      .sendNotification(subscription, payload)
      .catch(err => console.error(err));
});
module.exports = server
