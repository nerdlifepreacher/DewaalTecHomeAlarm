const path = require('path')
const express = require('express')
const webpush = require('web-push')
const alarmRoutes = require('./routes/data')
const auth = require('./routes/api/auth')
const users = require('./routes/api/users')
const server = express()
const mongoose = require('mongoose')
require('dotenv').config()
const db = process.env.MONGOURI
const JWT_SECRET = process.env.JWT_SECRET


//middleware
server.use(express.static(path.join(__dirname, '../public')))
server.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
server.use(express.urlencoded({ extended: true }))
server.use(express.json())

//routes
server.use('/', alarmRoutes)
server.use('/api/users', users)
server.use('/api/auth', auth)


mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIdex: true
  })
  
  .then(() => console.log('Mongo Database connected'))
  .catch(err => console.log(err))



const publicVapidKey =
  "BDbBRpqdGBywczNL_6OFC5J_AJXqCiMXUEXUNBr2i6iYLaaxcmpPgjRX6RdOXjctwGKfnxeEUds-qsS1dn7J48o";
const privateVapidKey = "LTmwGwqJSZ3oVC45hGETaJczGn6_8QaYspuu8tgMGVg";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

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
