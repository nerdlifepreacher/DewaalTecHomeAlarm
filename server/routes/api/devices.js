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
    const saveDevice = await newDevice.save()
    if (!saveDevice) throw Error('Something went wrong saving the device')
    res.status(200).json(saveDevice)
    }
    catch (e) { 
        res.status(400).json({ error: e.message })
    }

})

router.get('/:id', async (req, res) => {
    const userID = req.params.id
    try {
        const device = await Device.find({ "userID": userID }) 
        if (!device) throw Error('The device doesnt exist')
    res.status(200).json(device)
  }
  catch (e) {
    res.status(400).json({msg: e.message})
  }
})

router.get('/', async (req, res) => {
    try {
        const device = await Device.find({}) 
        if (!device) throw Error('No devices exist')
    res.status(200).json(device)
  }
  catch (e) {
    res.status(400).json({msg: e.message})
  }
})

router.delete('/:id', (req, res) => {
    Device.findById(req.params.id).then( device =>
        device.remove().then( derp => res.json({ success: true }))
    )
    .catch(err => res.status(404).json({ success: false }))
})
module.exports = router