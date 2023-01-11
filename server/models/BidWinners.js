const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const bidwinnerSchema = new mongoose.Schema({
    bid: {
        type: ObjectId,
        ref:"bidder",
        required: true
    }
})

module.exports = mongoose.model('BidWinner', bidwinnerSchema)