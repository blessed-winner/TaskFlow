const express = require('express')
const { fetchUserNotifications, toggleStatus, clearAll } = require('../controllers/notification.controller')

const noteRouter = express.Router()

noteRouter.get('/user/:id',fetchUserNotifications)
noteRouter.put('/toggle-is-read/:id',toggleStatus)
noteRouter.delete('/delete/:id',clearAll)

module.exports = noteRouter