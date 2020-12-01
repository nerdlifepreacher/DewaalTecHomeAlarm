const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LogSchema = new Schema({
    device_id: {
        type: String,
        required: true
    },
    armed: {
        type: String,
        required: true
    },
    reedsw_in: {
        type: String,
        required: true
    },
    alarm_out: {
        type: String,
        required: true
    },
    voltage: {
        type: String,
        required: true
    },
    endpoints: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default:Date.now
    }
})

module.exports = item = mongoose.model('user', LogSchema)