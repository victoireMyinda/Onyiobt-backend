const asynHandler = require("express-async-handler");
const accountModel = require("../models/accountModel");

const findOneAccount = asynHandler(async(req, res) => {
    const { id } = req.params;
    try {
        const getOneAccount = await accountModel.findById({ _id: id });
        if (getOneAccount) {
            res
                .status(200)
                .json({ message: "account finded success", data: getOneAccount });
        } else {
            res.status(404).json({ message: "account not find" });
        }
    } catch (error) {
        res.status(500).json({ message: "server error", error });
    }
});

const findAllAccounts = asynHandler(async(req, res) => {
    try {
        const getAll = await accountModel.find();
        if (getAll) {
            res.status(200).json({ message: "accounts finded", data: getAll });
        } else {
            res.status(404).json({ message: "accounts not find" });
        }
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
});

const updateAccount = asynHandler(async(req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "Data to update can not be empty" });
    }

    const id = req.params.id;
    accountModel
        .findByIdAndUpdate(id, req.body)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot Update account with ${id}. Maybe user not found!`,
                });
            } else {
                res.status(200).json({ message: "account updated succes", data: data });
            }
        })
        .catch((err) => {
            res
                .status(500)
                .send({ message: "Error Update account information", err });
        });
});

const deleteAccount = asynHandler(async(req, res) => {
    const id = req.params.id;

    accountModel
        .findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                res
                    .status(404)
                    .json({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
            } else {
                res.json({
                    message: "account was deleted successfully!",
                    data: data,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete account with id=" + id,
            });
        });
});

module.exports = {
    findOneAccount,
    findAllAccounts,
    updateAccount,
    deleteAccount,
};