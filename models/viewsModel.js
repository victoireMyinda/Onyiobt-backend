const mongoose = require('mongoose')

const viewSchema = mongoose.Schema({
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "videomodel"
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usermodel"
    },

}, {
    timestamps: true,
})

const viewModel = mongoose.model("viewmodel", viewSchema)
module.exports = viewModel