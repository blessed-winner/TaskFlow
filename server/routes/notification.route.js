const express = require('express')
const { fetchUserNotifications } = require('../controllers/notification.controller')

const noteRouter = express.Router()

noteRouter.get('/user/:id',fetchUserNotifications)

module.exports = noteRouter