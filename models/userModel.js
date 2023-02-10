const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    },

    isActive: {
        type: Boolean,
        default: false
    },

    photo: {
        data: Buffer,
        contentType: String
    },
}, {
    timestamps: true
})

const userModel = mongoose.model("usermodel", userSchema)
module.exports = userModel