const User = require('../models/userModel')
const Token = require('../models/tokenModel')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')
const jwt = require('jsonwebtoken')
const { expressjwt } = require('express-jwt')
const bcrypt = require('bcryptjs')


// Register User
const registerUser = async (req, res) => {
    // const {name, email, password} = req.body
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            // photo:req.file.path,
            phone: req.body.phone,
            address: req.body.address,
            role: req.body.role
        })
        let token = new Token({
            token: crypto.randomBytes(16).toString('hex'),
            user: user._id
        })
        token = await token.save()
        if (!token) {
            return res.status(400).json({ error: "Failed to generate token. Something went wrong" })
        }
        const url = `${process.env.FRONTEND_URL}/confirmuser/${token.token}`

        sendEmail({
            from: "noreply@ourstore.com",
            to: user.email,
            subject: "Verification/Confirmation email",
            text: `Please click on the following link to verify your account. ${token.token}`,
            html: `<a href = ${url}><button> Verify Account </button></a>`

        })

        user = await user.save()
        if (!user) {
            return res.status(400).json({ error: "Something went wrong" })
        }
        res.send(user)
    }
    else {
        return res.status(400).json({ error: "User/Email already exists." })
    }
}

// Confirm User
const confirmUser = async (req, res) => {
    const token = await Token.findOne({ token: req.params.token }) // findOne ->returns object and find -> returns array and if array empty then also returns the empty array
    if (!token) {
        return res.status(400).json({ error: "TOKEN not found or may have expired." })
    }
    let user = await User.findById(token.user)
    if (!user) {
        return res.status(400).json({ error: "User not found" })
    }
    if (user.isVerified) {
        return res.status(400).json({ error: "User already verified. Login to continue" })
    }
    user.isVerified = true
    user = await user.save()
    if (!user) {
        return res.status(400).json({ error: "Failed to verify" })
    }
    return res.status(200).json({ message: "User verified successfully" })
}


// Resend Verification Link
const resendConfirmation = async (req, res) => {
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ error: "Email is not registered, Please register" })
    }
    if (user.isVerified) {
        return res.status(400).json({ error: "User already verified" })
    }
    let token = new Token({
        token: crypto.randomBytes(16).toString('hex'),
        user: user._id
    })
    token = await token.save()
    if (!token) {
        return res.status(400).json({ error: "Failed to generate token. Something went wrong" })
    }
    const url = `${process.env.FRONTEND_URL}/confirmuser/${token.token}`
    sendEmail({
        from: "noreply@ourstore.com",
        to: user.email,
        subject: "Verification/Confirmation email",
        text: `Please click on the following link to verify your account. ${token.token}`,
        html: `<a href = ${url}><button> Verify Account </button></a>`

    })
    res.status(200).json({ message: "Verification link has been sent to your email." })
}

// Forget Password
const forgetPassword = async (req, res) => {
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ error: "Email not registered. Please register" })
    }
    let token = new Token({
        token: crypto.randomBytes(16).toString('hex'),
        user: user._id
    })
    token = await token.save()
    if (!token) {
        return res.status(400).json({ error: "Failed to generate token. Something went wrong" })
    }
    const url = `${process.env.FRONTEND_URL}/resetpassword/${token.token}`

    sendEmail({
        from: "noreply@ourstore.com",
        to: user.email,
        subject: "Password Reset Link",
        text: `Please click on the following link to Reset your password. ${token.token}`,
        html: `<a href = ${url}><button> RESET PASSWORD </button></a>`

    })
    res.status(200).json({ message: "Password Reset Link has been sent to your email" })
}

// Reset Password
const resetPassword = async (req, res) => {
    let token = await Token.findOne({ token: req.params.token })
    if (!token) {
        return res.status(400).json({ error: "Token Not Found or Token May Have Expired" })
    }
    let user = await User.findOne({ _id: token.user })
    if (!user) {
        return res.status(400).json({ error: "User Not Found" })
    }
    user.password = req.body.password
    user = await user.save()
    if (!user) {
        return res.status(400).json({ error: "Failed to Save Password" })
    }
    return res.status(200).json({ message: "Password Reset Successfully" })
}

// Change Password
const changePassword = async (req, res) => {
    const { password, new_password } = req.body
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(400).json({ error: "User not found. Please signup" })
    }
    if (!user.authenticate(password)) {
        return res.status(400).json({ error: "Old password is incorrect. Please try again" })
    }
    user.password = new_password;
    saveuser = await user.save();
    if (!saveuser) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    return res.status(200).json({ message: "Password Change Successfully" })
}

// Signin
const signin = async (req, res) => {
    const { email, password } = req.body

    let user = await User.findOne({ email: email })
    if (!user) {
        return res.status(400).json({ error: "Email not registered" })
    }
    if (!user.authenticate(password)) {
        return res.status(400).json({ error: "Incorrect Password. PLease try again" })
    }
    if (!user.isVerified) {
        return res.status(400).json({ error: "Email not verified. Please verify your account" })
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

    res.cookie('myCookie', token, { expire: Date.now() + 86000 })

    const { _id, name, role, phone, address } = user
    res.json({ token, user: { _id, name, role, phone, address, email } })
}

// User List
const userList = async (req, res) => {
    let user = await User.find().select('-hashed_password').select('-salt')
    if (!user) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(user)
}

// User Details
const userDetails = async (req, res) => {
    let user = await User.findById(req.params.id).select('-hashed_password').select('-salt')
    if (!user) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(user)
}

// Update User
const updateUser = async (req, res) => {
    let user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        // photo: req.file.path,
        phone: req.body.phone,
        address: req.body.address,
    }, { new: true })
    if (!user) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(user)
}

// Delete User
const deleteUser = async (req, res) => {
    let user = await User.findByIdAndRemove(req.params.id)
    if (!user) {
        return res.status(400).json({ error: "Seller not found" })
    }
    else {
        return res.status(200).json({ message: "User deleted successfully" })
    }
}

module.exports = {
    registerUser,
    confirmUser,
    resendConfirmation,
    forgetPassword,
    resetPassword,
    changePassword,
    signin,
    userList,
    userDetails,
    updateUser,
    deleteUser
}
