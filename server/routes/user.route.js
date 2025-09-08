const express = require('express')
const { addNewUser, updateUser, deleteUser, getAllUsers, adminDashboardData, userDashboardData, managerDashboardData } = require('../controllers/user.controller')
const authMiddleware = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')

const userRouter = express.Router()

userRouter.post('/admin/add-user',authMiddleware,roleMiddleware('ADMIN'),addNewUser)
userRouter.put('/admin/update/:id',authMiddleware,roleMiddleware('ADMIN'),updateUser)
userRouter.delete('/admin/delete/:id',authMiddleware,roleMiddleware('ADMIN'),deleteUser)
userRouter.get('/admin/All',authMiddleware,roleMiddleware('ADMIN'),getAllUsers)
userRouter.get('/admin/dashboard',authMiddleware,roleMiddleware('ADMIN'),adminDashboardData)
userRouter.get('/user/dashboard',authMiddleware,roleMiddleware('USER'),userDashboardData)
userRouter.get('/manager/dashboard',authMiddleware,roleMiddleware('MANAGER'),managerDashboardData)

module.exports = userRouter
