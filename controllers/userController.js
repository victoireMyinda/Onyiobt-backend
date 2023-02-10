const userModel = require("../models/userModel");
const accountModel = require("../models/accountModel")

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asynHandler = require("express-async-handler");

const createUSer = asynHandler(async(req, res) => {
    const { name, email, password, photo } = req.body;

    if (!req.body) {
        res.status(400).json({ message: "input  good data" });
    }

    try {
        checkIfUserExists = await userModel.findOne({ email });
        if (checkIfUserExists) {
            res.status(401).json({ message: "this user is already exists" });
        } else {
            try {

                //hash password
                const salt = bcrypt.genSaltSync(10);
                const hashPassword = await bcrypt.hash(password, salt);

                const user = await userModel.create({
                    name,
                    email,
                    password,
                    photo,
                    password: hashPassword,
                })

                const account = await accountModel.create({
                    userId: user._id,
                    accountNumber: 123,
                    solde: 2000,
                    devise: "OBT"
                })

                res.status(201).json({
                    message: "user created success",
                    data: { user, account },
                    token: generateToken(user._id),
                })

            } catch (error) {
                console.log(error)
                res.status(500).json({ message: error })
            }

        }
    } catch (error) {
        res.status(500).json({ message: "server error : ", error });
    }
});


const findOneUser = asynHandler(async(req, res) => {
    const { id } = req.params;
    try {
        const getOneUser = await userModel.findById({ _id: id });
        if (getOneUser) {
            res
                .status(200)
                .json({ message: "user finded success", data: getOneUser });
        } else {
            res.status(404).json({ message: "user not find" });
        }
    } catch (error) {
        res.status(500).json({ message: "server error", error });
    }
});

// const findOnUserAndAccount

//const findAllUsersAndAccounts



const findAllUser = asynHandler(async(req, res) => {
    try {
        const getAll = await userModel.find();
        if (getAll) {
            res.status(200).json({ message: "users finded", data: getAll });
        } else {
            res.status(404).json({ message: "users not find" });
        }
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
});

const updateUser = asynHandler(async(req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "Data to update can not be empty" });
    }

    const id = req.params.id;
    userModel
        .findByIdAndUpdate(id, req.body)
        .then((data) => {
            if (!data) {
                res
                    .status(404)
                    .send({
                        message: `Cannot Update user with ${id}. Maybe user not found!`,
                    });
            } else {
                res.status(200).json({ message: "user updated", data: data });
            }
        })
        .catch((err) => {
            res.status(500).send({ message: "Error Update user information", err });
        });
});

const deleteUser = asynHandler(async(req, res) => {
    const id = req.params.id;

    userModel
        .findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                res
                    .status(404)
                    .json({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
            } else {
                res.json({
                    message: "user was deleted successfully!",
                    data: data,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete User with id=" + id,
            });
        });
});

//generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: "30d" });
};

module.exports = {
    createUSer,
    findOneUser,
    findAllUser,
    updateUser,
    deleteUser,
};