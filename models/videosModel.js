const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usermodel"
    },

    url: {
        type: String,
        required: true,
    },

    nom: {
        type: String,
        required: true,
    },

    detail: {
        type: String,
    },

    prix: {
        type: Number,
        defaut: 00
    }
}, {
    timestamps: true,
});

const videoModel = mongoose.model("videomodel", videoSchema);
module.exports = videoModel;