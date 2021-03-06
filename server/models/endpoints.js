const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EndpointSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    endpoint: {
        type: JSON,
        required: true
    },
    shortName: {
        type:String   
    }
})

module.exports = item = mongoose.model('endpoint', EndpointSchema)