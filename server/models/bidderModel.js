const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const bidderSchema = mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        trim: true
    },
    product_price: {
        type: Number,
        required: true,
    },
    bidder_price: {
        type: Number,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    product_image: {
        type: String,
        required: true
    },
    bidder: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    product_id: {
        type: ObjectId,
        ref: "Product",
        required: true
    },
    isBidded: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


module.exports = mongoose.model('Bidder', bidderSchema)