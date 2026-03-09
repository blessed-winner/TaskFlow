const express = require('express')
const { log_in_post, signup } = require('../controllers/auth.controller')
const authRouter = express.Router()

authRouter.post('/login',log_in_post)
authRouter.post('/signup', signup)

module.exports = authRouter