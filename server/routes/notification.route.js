const express = require('express')
const { fetchUserNotifications } = require('../controllers/notification.controller')

const noteRouter = express.Router()

noteRouter.get('/All',fetchUserNotifications)

module.exports = noteRouter