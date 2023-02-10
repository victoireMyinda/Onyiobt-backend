const express = require('express')
const {
    videoPost,
    findOneVideo,
    findAllVideos,
    updateVideo,
    deleteVideo,
} = require('../controllers/videoController')

const router = express.Router()

router.post('/posts/:postId', videoPost)
router.get('/find/:id', findOneVideo)
router.get('/find', findAllVideos)
router.put('modify/:id', updateVideo)
router.delete('/remove/:id', deleteVideo)

module.exports = router