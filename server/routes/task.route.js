const express = require('express')
const { addNewTask, fetchAllTasks, fetchUserTasks } = require('../controllers/task.controller')
const taskRouter = express.Router()

taskRouter.post('/add-task',addNewTask)
taskRouter.get('/All',fetchAllTasks)
taskRouter.get('/user/:userId',fetchUserTasks)

module.exports = taskRouter