const express = require('express')
const { fetchUserNotifications, toggleStatus } = require('../controllers/notification.controller')

const noteRouter = express.Router()

noteRouter.get('/user/:id',fetchUserNotifications)
noteRouter.put('/toggle-is-read',toggleStatus)

module.exports = noteRouter