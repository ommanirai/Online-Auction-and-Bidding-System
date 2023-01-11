const Product = require('../models/productModel')

// Add Product
const addProduct = async (req, res) => {
    let product = new Product({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        product_image: req.file.path,
        category: req.body.category,
        owner: req.body.user
    })
    product = await product.save()
    if (!product) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(product)
}


// View Products
const viewProducts = async (req, res) => {
    let product = await Product.find().populate('category', 'category_name')
    if (!product) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(product)
}

// View only user products
const viewOwnProducts = async (req, res) => {
    let product = await Product.find({ owner: req.params.id }).populate('category', 'category_name')
    if (!product) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(product)
}

// All detail of the product
const productDetails = async (req, res) => {
    let product = await Product.findById(req.params.id).populate('category', 'category_name')
    if (!product) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(product)
}

// Product by category (to display products of the category)
const productByCategory = async (req, res) => {
    let product = await Product.find({ category: req.params.category_id })
    if (!product) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(product)
}

// Update Product
const updateProduct = async (req, res) => {
    let product = await Product.findByIdAndUpdate(req.params.id, {
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        // product_image: req.file.path,
        category: req.body.category
    },
        { new: true })
    if (!product) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(product)
}

// Delete Product
const deleteProduct = async (req, res) => {
    let product = await Product.findByIdAndRemove(req.params.id)
    if (!product) {
        return res.status(400).json({ error: "Product not found" })
    }
    else {
        return res.status(200).json({ message: "Product deleted successfully" })
    }
}


// to get filtered Products
const filteredProducts = async (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : 'CreatedAt'
    let order = req.query.order ? req.query.order : 1
    let limit = req.query.limit ? Number(req.query.limit) : 2000000

    // to get filter
    let Args = {}
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'product_price') {
                Args[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }
            else {
                Args[key] = req.body.filters[key]
            }
        }
    }
    let filteredProducts = await Product.find(Args).populate('category')
        .sort([[sortBy, order]])
        .limit(limit)

    if (!filteredProducts) {
        return res.status(400).json({ error: "Somethind went wrong" })
    }
    else {
        res.json({
            filteredProducts,
            size: filteredProducts.length
        })
    }
}

// to get related products
const relatedProducts = async (req, res) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    else {
        let relatedProducts = await Product.find({
            category: product.category,
            _id: { $ne: product._id }
        })
            .sort([['createdAt', 'DESC']])
            .limit(4)
        if (!relatedProducts) {
            return res.status(400).json({ error: "Something went wrong" })
        }
        else {
            res.send(relatedProducts)
        }
    }
}

// go for bidding
const applyBid = async (req, res) => {
    let product = await Product.findById(req.params.id).populate('category', 'category_name')
    if (!product) {
        return res.status(400).json({ error: "Product not found." })
    }
    product.bid = true
    product = await product.save()
    if (!product) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    return res.status(200).json({ message: "Now product is in bidding" })
}


module.exports = {
    addProduct,
    viewProducts,
    productDetails,
    productByCategory,
    updateProduct,
    deleteProduct,
    filteredProducts,
    relatedProducts,
    applyBid,
    viewOwnProducts
}