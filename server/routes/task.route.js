const express = require('express')
const { addNewTask, fetchAllTasks, fetchUserTasks, deleteTask, toggleInProgressTasks, toggleCompletedTasks, updateTask } = require('../controllers/task.controller')
const authMiddleware = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')
const taskRouter = express.Router()

taskRouter.post('/add-task', authMiddleware, roleMiddleware('MANAGER'), addNewTask)
taskRouter.get('/All', authMiddleware, roleMiddleware('MANAGER', 'ADMIN'), fetchAllTasks)
taskRouter.get('/user/:userId', authMiddleware, fetchUserTasks)
taskRouter.delete('/delete/:id', authMiddleware, roleMiddleware('MANAGER'), deleteTask)
taskRouter.post('/toggle-in-progress', authMiddleware, toggleInProgressTasks)
taskRouter.post('/toggle-completed', authMiddleware, toggleCompletedTasks)
taskRouter.put('/update/:id', authMiddleware, roleMiddleware('MANAGER'), updateTask)

module.exports = taskRouter