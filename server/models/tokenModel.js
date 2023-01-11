const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: ObjectId, //user_id
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(), // generate created date
        expires: 86400 // for autodelete operation
    }
})

module.exports = mongoose.model('Token', tokenSchema)