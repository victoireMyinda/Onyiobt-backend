const views = require("../models/viewsModel")
const asynHandler = require('express-async-handler')



//findOneviewByIdVideo

//findAllviewsByIdVideo

//calcul view by video watched and increment count property from viewModel

const findOneView = asynHandler(async(req, res) => {
    const { id } = req.params;
    try {
        const getOneview = await views.findById({ _id: id });
        if (getOneview) {
            res
                .status(200)
                .json({ message: "view finded success", data: getOneview });
        } else {
            res.status(404).json({ message: "view not find" });
        }
    } catch (error) {
        res.status(500).json({ message: "server error", error });
    }
});

const findAllViews = asynHandler(async(req, res) => {
    try {
        const getAll = await views.find();
        if (getAll) {
            res.status(200).json({ message: "views finded", data: getAll });
        } else {
            res.status(404).json({ message: "views not find" });
        }
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
});


module.exports = { findOneView, findAllViews }