const express = require('express')

const { findOneView, findAllViews } = require("../controllers/viewsController")

const router = express.Router()

router.get("/find/:id", findOneView)
router.get("/find", findAllViews)


module.exports = router