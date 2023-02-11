const videoModel = require("../models/videosModel");
const userModel = require("../models/userModel");
const viewsModel = require("../models/viewsModel");
const accountModel = require("../models/accountModel");
const asynHandler = require("express-async-handler");


const videoPost = asynHandler(async(req, res) => {
    const { nom, detail, url } = req.body;
    const { userId } = req.params;

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


// check if user exists
const checkIfUserExists = asynHandler(async(req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.findById({ _id: id });
        if (user) {
            res.status(200).json({ message: "user finded", data: user });
        } else {
            res.status(400).json({ message: "user not find" });
        }
    } catch (error) {
        res.status(500).json({ message: "server error" + error });
    }
});

//check if Video exists
const checkIfVideoExists = asynHandler(async(req, res) => {
    const { id } = req.params;
    try {
        const user = await videoModel.findById({ _id: id });
        if (user) {
            res.status(200).json({ message: "video finded", data: user });
        } else {
            res.status(400).json({ message: "video not find" });
        }
    } catch (error) {
        res.status(500).json({ message: "server error" + error });
    }
});

const checkUserWachedVideo = (userId, videosId) => {
    return viewsModel.find({ userId, videosId });
};

const calculVideo = ({ userId, videoId }) => {
    const video = videoModel.findById({ videoId });

    if (!checkUserWachedVideo) {

        const compteUserViewer = accountModel.findById({ userId });
        if (compteUserViewer.solde > 0 && compteUserViewer.solde - video.prix > 0) {

            const createView = viewsModel.create({
                userId,
                videoId,
            });

            if (createView) {
                res.status(200).json({ message: 'view created succes', data: createView })
            } else {
                res.status(400).json({ message: "cannot created view" })
            }

            //update solde userViewer
            compteUserViewer.update({
                solde: compteUserViewer.solde - video.prix,
            });

            //update solde userPost
            const compteUserPost = accountModel.findById({ userId: video.userId });
            compteUserPost.update({
                solde: compteUserViewer.solde + video.prix,
            });

            return video.url;
        } else {
            res
                .status(403)
                .json({
                    message: "your balance is insufficient to perform this operation. please recharge your account",
                });
        }
    } else {
        return video.url;
    }
};

module.exports = {
    videoPost,
    findOneVideo,
    findAllVideos,
    updateVideo,
    deleteVideo,
    calculVideo
};