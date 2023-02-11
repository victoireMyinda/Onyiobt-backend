const mongoose = require('mongoose')

const viewSchema = mongoose.Schema({
    videoID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "videomodel"
    },

    usersID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usermodel"
    },

}, {
    timestamps: true,
})

const viewModel = mongoose.model("viewmodel", viewSchema)
module.exports = viewModel