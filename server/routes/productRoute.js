const express = require('express')
const { addProduct, viewProducts, productDetails, productByCategory, updateProduct, deleteProduct, filteredProducts, relatedProducts, applyBid, viewOwnProducts } = require('../controllers/productController')
const upload = require('../utils/fileUpload')
const { productCheck, validation } = require('../validation')
const router = express.Router()

router.post('/addproduct', upload.single('product_image'), productCheck, validation, addProduct)
router.get('/viewproducts', viewProducts)
router.get('/productdetails/:id', productDetails)
router.get('/productbycategory/:category_id', productByCategory)
router.put('/updateproduct/:id', productCheck, validation, updateProduct)
router.delete('/deleteproduct/:id', deleteProduct)
router.post('/filteredProduct', filteredProducts)
router.get('/relatedProducts/:id', relatedProducts)
router.get('/goforbidding/:id', applyBid)
router.get('/viewmyproducts/:id', viewOwnProducts)

module.exports = router