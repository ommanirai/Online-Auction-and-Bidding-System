const express = require('express')
const { addCategory, viewCategories, updatecategory, deleteCategory, findCategory } = require('../controllers/categoryController')
const { categoryCheck, validation, updateCategoryCheck } = require('../validation')
const router = express.Router()

router.post('/addcategory', categoryCheck, validation, addCategory)
router.get('/viewCategory', viewCategories)
router.put('/updatecategory/:id', updateCategoryCheck, validation, updatecategory)
router.delete('/deletecategory/:id', deleteCategory)
router.get('/findcategory/:id', findCategory)

module.exports = router 