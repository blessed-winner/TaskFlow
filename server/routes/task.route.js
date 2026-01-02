const express = require('express')
const { addNewTask, fetchAllTasks } = require('../controllers/task.controller')
const taskRouter = express.Router()

taskRouter.post('/add-task',addNewTask)
taskRouter.get('/All',fetchAllTasks)

module.exports = taskRouter