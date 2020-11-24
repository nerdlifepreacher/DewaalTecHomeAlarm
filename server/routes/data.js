const express = require('express')
const router = express.Router()
const send = require('../post')

router.use(express.json())

router.post ('/update', (req, res) => {
    res.status(201).json({});
    console.log(req.body.device_id)
    message = "Device: " + req.body.device_id+"\n\ "+"Armed: "+req.body.armed+"\n\ "+"Reedsw in: "+req.body.reedsw_in+"\n\ "+"Alarm out: "+req.body.alarm_out+"\n\ "+"Voltage: "+req.body.voltage 
    send(message)
  })
module.exports = router