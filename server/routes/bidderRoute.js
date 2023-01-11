const express = require('express')
const { bidProduct, viewBidderProducts, viewBidders, maxPrice } = require('../controllers/bidderController')
const upload = require('../utils/fileUpload')
const { bidProductPrice, validation } = require('../validation')
const router = express.Router()

router.post('/bidproduct', upload.single('product_image'), bidProductPrice, validation, bidProduct)
router.get('/viewbidderproducts/:id', viewBidderProducts)
router.get('/seller/viewbidder/:id', viewBidders)
router.get('/findmaxprice/:id', maxPrice)

module.exports = router