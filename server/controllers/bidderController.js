const Bidder = require('../models/bidderModel')
const BidWinner = require('../models/BidWinners')
const Product = require('../models/productModel')
const User = require('../models/userModel')

// bidding the product
const bidProduct = async (req, res) => {
    let bidder = new Bidder({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        bidder_price: req.body.bidder_price,
        product_description: req.body.product_description,
        product_image: req.body.product_image,
        bidder: req.body.bidder,
        product_id: req.body.product_id
    })
    bidder.isBidded = true
    bidder = await bidder.save()
    if (!bidder) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(bidder)
}

// View only bidder products
const viewBidderProducts = async (req, res) => {
    let product = await Bidder.find({ bidder: req.params.id })
    if (!product) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(product)
}

// View bidders list in a product
const viewBidders = async (req, res) => {
    let product = await Bidder.find({ product_id: req.params.id }).populate("bidder")
    if (!product) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(product)
}

// find maximum bidder price
const maxPrice = async (req, res) => {
    let bids = await Bidder.find({ product_id: req.params.id }).populate('bidder')
    if (!bids) {
        return res.status(400).json({ error: "Can't get the product." })
    }
    
    let bidder_max_price_array = bids.map((products) => {
        return products.bidder_price
    })

    let max_price = Math.max(...bidder_max_price_array)
    if (!max_price) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    // res.send({max_price})
    let bidWinner = await Bidder.findOne({bidder_price: max_price}).populate('bidder')
    if(!bidWinner){
        return res.status(400).json({ error: "Something went wrong" })
    }

    let new_bidWinner = new BidWinner({bid: bidWinner._id})
    new_bidWinner = await new_bidWinner.save()

    let product = await Product.findById(bidWinner.product_id)
    product.bid = false
    product = await product.save()

    // let winner = await User.findById(bidWinner.bidder)

    return res.send(bidWinner)

}

module.exports = {
    bidProduct,
    viewBidderProducts,
    viewBidders,
    maxPrice
}