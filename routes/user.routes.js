const express = require('express')
const {
    createUSer,
    findOneUser,
    findAllUser,
    updateUser,
    deleteUser,
} = require("../controllers/userController")

//const { protect } = require("./midelleware/auth")

const router = express.Router()

// API CRUD client
router.post('/posts', createUSer)
router.get('/find/:id', findOneUser)
router.get('/find', findAllUser)
router.put('/modify/:id', updateUser)
router.delete('/remove/:id', deleteUser)


module.exports = router