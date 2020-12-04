const express = require('express')
const router = express.Router()
const Device = require('../../models/devices')

router.post('/', async (req, res) => {
    const { deviceName, deviceID, userID } = req.body
    try{
    const newDevice = new Device({
        deviceName: deviceName,
        deviceID: deviceID,
        userID: userID
    })
    console.log(newDevice)
    const saveDevice = await newDevice.save()
    if (!saveDevice) throw Error('Something went wrong saving the device')
    res.status(200).json({ success: true })
    }
    catch (e) { 
        res.status(400).json({ error: e.message })
    }

})
module.exports = router