const express = require('express')
const { fetchNotifications } = require('../controllers/notification.controller')

const noteRouter = express.Router()

noteRouter.get('/All',fetchNotifications)

module.exports = noteRouter