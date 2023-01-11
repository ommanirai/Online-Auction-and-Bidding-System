const Category = require("../models/categoryModel")

// Add Category
const addCategory = async (request, response) => {
    let category = await Category.findOne({ category_name: request.body.category_name })
    if (!category) {
        let category = new Category({
            category_name: request.body.category_name
        })
        category = await category.save()
        if (!category) {
            return response.status(400).json({ error: "something went wrong" })
        }
        response.send(category)
    }
    else {
        return response.status(400).json({ error: "Category already exists." })
    }
}

// View Categories
const viewCategories = async (req, res) => {
    let category = await Category.find()
    if (!category) {
        return response.status(400).json({ error: "Something went wrong" })
    }
    res.send(category)
}

// Update Category
const updatecategory = async (req, res) => {
    let category = await Category.findByIdAndUpdate(req.params.id, {
        category_name: req.body.new_category
    },
        { new: true })
    if (!category) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send(category)
}

// Delete Category
const deleteCategory = (req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then((category) => {
            if (category == null) {
                return res.status(400).json({ error: "Category does not exist." })
            }
            return res.status(200).json({ message: "Category deleted successfully." })
        })
        .catch(() => {
            return res.status(400).json({ error: "Something went wrong." })
        })
}

// For Particular Category Information
// Displays in the form of object
const findCategory = async (req, res) => {
    let category = await Category.findById(req.params.id)
    if (!category) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send(category)
}

module.exports = {
    addCategory,
    viewCategories,
    updatecategory,
    deleteCategory,
    findCategory
}