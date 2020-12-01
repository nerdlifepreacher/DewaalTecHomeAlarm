const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EndpointSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    endpoint: {
    type: String,
    required: true
    }
})

module.exports = item = mongoose.model('user', EndpointSchema)