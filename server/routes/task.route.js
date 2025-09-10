const express = require('express')
const { addNewTask, fetchAllTasks, fetchUserTasks, deleteTask } = require('../controllers/task.controller')
const taskRouter = express.Router()

taskRouter.post('/add-task',addNewTask)
taskRouter.get('/All',fetchAllTasks)
taskRouter.get('/user/:userId',fetchUserTasks)
taskRouter.delete('/delete/:id',deleteTask)

module.exports = taskRouter