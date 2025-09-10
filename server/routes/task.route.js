const express = require('express')
const { addNewTask, fetchAllTasks, fetchUserTasks, deleteTask, toggleInProgressTasks, toggleCompletedTasks } = require('../controllers/task.controller')
const taskRouter = express.Router()

taskRouter.post('/add-task',addNewTask)
taskRouter.get('/All',fetchAllTasks)
taskRouter.get('/user/:userId',fetchUserTasks)
taskRouter.delete('/delete/:id',deleteTask)
taskRouter.post('/toggle-in-progress',toggleInProgressTasks)
taskRouter.post('/toggle-completed',toggleCompletedTasks)

module.exports = taskRouter