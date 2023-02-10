const jwt = require('jsonwebtoken')
const asynHandler = require('express-async-handler')
const userModel = require('../models/userModel')

const protect = asynHandler(async(request, response, next) => {
    let token;

    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
        try {
            //recuperation de token depuis headers
            token = request.headers.authorization.split('')[1]

            //Verification de token 
            const decoded = jwt.verify(token, process.env.JWT_TOKEN)

            //recuperer user depuis son token
            request.user = await userModel.findById(decoded.id).select('-password')

            next()

        } catch (error) {
            console.log(error)
            response.status(401)
            throw new Error('user not authorized')

        }
    }

    if (!token) {
        response.status(401)
        throw new Error('user not authorized, no token')
    }
})

module.exports = { protect }