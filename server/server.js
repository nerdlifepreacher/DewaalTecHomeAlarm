const path = require('path')
const express = require('express')
const webpush = require('web-push')
const alarmRoutes = require('./routes/data')
const authRoutes = require('./routes/auth')

const server = express()

server.use(express.static(path.join(__dirname, '../public')))
server.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

server.use(express.urlencoded({ extended: true }))
server.use('/', alarmRoutes)
server.use(express.json())


const publicVapidKey =
  "BDbBRpqdGBywczNL_6OFC5J_AJXqCiMXUEXUNBr2i6iYLaaxcmpPgjRX6RdOXjctwGKfnxeEUds-qsS1dn7J48o";
const privateVapidKey = "LTmwGwqJSZ3oVC45hGETaJczGn6_8QaYspuu8tgMGVg";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);
const payload = JSON.stringify({ title: "DeWaalTec Home alarm", body:"The truth is out there"});
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
