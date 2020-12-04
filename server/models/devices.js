const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DeviceSchema = new Schema({
    deviceID: {
        type: String,
        required: true
    },
    deviceName: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default:Date.now
    }
})

module.exports = item = mongoose.model('device', DeviceSchema)