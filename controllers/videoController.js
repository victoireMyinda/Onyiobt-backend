const videoModel = require("../models/videosModel");
const userModel = require("../models/userModel");
const views = require("../models/viewsModel");
const asynHandler = require("express-async-handler");

const videoPost = asynHandler(async(req, res) => {
    const { nom, detail, url } = req.body;
    const { userId } = req.params

    if (!req.body) {
        return res.status(400).json({ message: "input  good data" });
    }

    try {
        const checkIfVideoExists = await videoModel.findOne({ url });
        if (checkIfVideoExists) {
            res.status(401).json({ message: "this video is already posted" });
        } else {
            try {
                const video = await videoModel.create({
                    userId,
                    url,
                    nom,
                    detail,
                });

                res.status(201).json({
                    message: "video posted success",
                    data: { video },
                });
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: error });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error : ", error });
    }
});

const findOneVideo = asynHandler(async(req, res) => {
    const { id } = req.params;
    try {
        const getOneVideo = await videoModel.findById({ _id: id });
        if (getOneVideo) {
            res
                .status(200)
                .json({ message: "video finded success", data: getOneVideo });
        } else {
            res.status(404).json({ message: "video not find" });
        }
    } catch (error) {
        res.status(500).json({ message: "server error", error });
    }
});

const findAllVideos = asynHandler(async(req, res) => {
    try {
        const getAll = await videoModel.find();
        if (getAll) {
            res.status(200).json({ message: "videos finded", data: getAll });
        } else {
            res.status(404).json({ message: "videos not find" });
        }
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
});

const findAllvideosByUserId = asynHandler(async(req, res) => {
    console.log("");
});

const updateVideo = asynHandler(async(req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "Data to update can not be empty" });
    }

    const id = req.params.id;
    videoModel
        .findByIdAndUpdate(id, req.body)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot Update video with ${id}. Maybe video not found!`,
                });
            } else {
                res.status(200).json({ message: "video updated", data: data });
            }
        })
        .catch((err) => {
            res.status(500).send({ message: "Error Update video information", err });
        });
});

const deleteVideo = asynHandler(async(req, res) => {
    const id = req.params.id;

    videoModel
        .findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                res
                    .status(404)
                    .json({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
            } else {
                res.json({
                    message: "video was deleted successfully!",
                    data: data,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete video with id=" + id,
            });
        });
});

module.exports = {
    videoPost,
    findOneVideo,
    findAllVideos,
    findAllvideosByUserId,
    updateVideo,
    deleteVideo,
};