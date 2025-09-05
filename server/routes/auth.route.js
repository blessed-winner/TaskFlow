const express = require('express')
const { log_in_post } = require('../controllers/auth.controller')
const authRouter = express.Router()

authRouter.post('/login',log_in_post)

module.exports = authRouter