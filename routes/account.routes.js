const express = require('express')
const {
    findOneAccount,
    findAllAccounts,
    updateAccount,
    deleteAccount,
} = require('../controllers/accountController')

const router = express.Router()

router.get('/find/:id', findOneAccount)
router.get('/find', findAllAccounts)
router.get('/modify/:id', updateAccount)
router.delete('/remove/:id', deleteAccount)


module.exports = router