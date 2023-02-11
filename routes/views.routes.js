const express = require('express')

const { findOneView, findAllViews, findAllViewsByVideoId } = require("../controllers/viewsController")

const router = express.Router()

router.get("/find/:id", findOneView)
router.get("/find", findAllViews)
router.get("/findAll/:id", findAllViewsByVideoId)


module.exports = router