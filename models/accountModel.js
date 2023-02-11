const mongoose = require('mongoose')


const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usermodel"
    },
    accountNumber: {
        type: String,
    },

    devise: {
        type: String,
        default: "OBT"
    },

    solde: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const accoutModel = mongoose.model('accountmodel', accountSchema)
module.exports = accoutModel