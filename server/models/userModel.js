const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const uuidv1 = require("uuidv1")
const crypto = require("crypto")


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    // photo: {
    //     type: String,
    //     required:true
    // },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: Number,
        default: 1
    },
    salt: String
}, {
    timestamps: true
})

// Encrypt password before saving to DB
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) {
//         return next()
//     }
//     // Hash Password
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(this.password, salt)
//     this.password = hashedPassword;
//     next();
// })


// Virtual Field
userSchema.virtual('password').set(function (password) {
    this._password = password // user password(non-hashed password)
    this.salt = uuidv1() //generate unique key
    this.hashed_password = this.encryptPassword(this._password)
})
    .get(function () {
        return this._password
    })


userSchema.methods = {
    encryptPassword: function (password) {
        if (password == null) {
            return ''
        }
        try {
            return (this.hashed_password = crypto.createHmac('sha256', this.salt).update(password).digest('hex')) // sha256 -> encryption algorithm
        }
        catch {
            return ''
        }
    },
    authenticate: function (password) {
        return this.hashed_password === this.encryptPassword(password)
    }
}

const User = mongoose.model("User", userSchema)
module.exports = User