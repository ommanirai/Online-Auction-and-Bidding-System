const { check, validationResult } = require('express-validator')

exports.categoryCheck = [ // categoryCheck le error haru ko array display garxa
    check('category_name', 'category name is reuqired').notEmpty()
        // check('category_name', 'category name is reuqired').not().isEmpty()
        .isLength({ min: 3 }).withMessage("category must be atleast 3 characters")
]

exports.updateCategoryCheck = [
    check('new_category', 'New category name is reuqired').notEmpty()
        .isLength({ min: 3 }).withMessage("category must be atleast 3 characters")
]

exports.productCheck = [
    check('product_name', 'product name is required').notEmpty()
        .isLength({ min: 3 }).withMessage("Product name must be at least 3 characters"),
    check('product_price', 'Product price is required').notEmpty()
        .isNumeric().withMessage('Product price must be a number'),
    check('product_description', 'Description is required').notEmpty()
        .isLength({ min: 20 }).withMessage('Description must be at least 20 character'),
    check('category', "Category is required").notEmpty(),
    // check('product_image', "Product Image is required").notEmpty()
]


exports.userCheck = [
    check('name', "Username is required").notEmpty()
        .isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),
    check('email', "Email is required").notEmpty()
        .isEmail().withMessage("Email format incorrect"),
    check('password', "Password is required").notEmpty()
        .not().isIn(['123', /password/i, 'god'])
        .withMessage('do not use common word as the password')
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
        .isLength({ max: 30 }).withMessage("Password must not be more than 30 characters")
        .matches(/[a-z]/).withMessage("Password must contain at least one lowercase alphabet")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase alphabet")
        .matches(/[0-9]/).withMessage("Password must contain at least one number") // \d (same as /[0-9]/)
        .matches(/[-_@#$%^&*]/).withMessage("Password must contain at least one special character")
        .not().matches(/[;:\\.]/).withMessage("This character is not allowed"),
    check('phone', "Phone number is required").notEmpty(),
    check('address', "Address is required").notEmpty()
        .isLength({ max: 20 }).withMessage("Address must not be more than 20 characters")
]

exports.updateUserCheck = [
    check('name', "Username is required").notEmpty()
        .isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),
    check('phone', "Phone number is required").notEmpty(),
    check('address', "Address is required").notEmpty()
        .isLength({ max: 20 }).withMessage("Address must not be more than 20 characters")
]

exports.changePasswordCheck = [
    check('password', "Old Password is required").notEmpty(),
    check('new_password', "New Password is required").notEmpty()
        .not().isIn(['123', /password/i, 'god'])
        .withMessage('do not use common word as the new password')
        .isLength({ min: 8 }).withMessage("New Password must be at least 8 characters")
        .isLength({ max: 30 }).withMessage("New Password must not be more than 30 characters")
        .matches(/[a-z]/).withMessage("New Password must contain at least one lowercase alphabet")
        .matches(/[A-Z]/).withMessage("New Password must contain at least one uppercase alphabet")
        .matches(/[0-9]/).withMessage("New Password must contain at least one number") // \d (same as /[0-9]/)
        .matches(/[-_@#$%^&*]/).withMessage("New Password must contain at least one special character")
        .not().matches(/[;:\\.]/).withMessage("This character is not allowed")
]

exports.resetPasswordCheck = [
    check('password', "Password is required").notEmpty()
        .not().isIn(['123', /password/i, 'god'])
        .withMessage('do not use common word as the password')
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
        .isLength({ max: 30 }).withMessage("Password must not be more than 30 characters")
        .matches(/[a-z]/).withMessage("Password must contain at least one lowercase alphabet")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase alphabet")
        .matches(/[0-9]/).withMessage("Password must contain at least one number") // \d (same as /[0-9]/)
        .matches(/[-_@#$%^&*]/).withMessage("Password must contain at least one special character")
        .not().matches(/[;:\\.]/).withMessage("This character is not allowed"),
]

exports.bidProductPrice = [
    check('bidder_price', "Your Price For This Product is Required").notEmpty()
]


// method calling order: categoryCheck, validation
exports.validation = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg })// displays one by one error
        // return res.status(400).json({ errors: errors.array().map(err => { return err.msg }) }) // displays all the errors at a time
    }
    next() // callback
}