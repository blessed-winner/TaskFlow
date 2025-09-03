const express = require('express')
const { addNewUser, updateUser, deleteUser, getAllUsers, adminDashboardData } = require('../controllers/user.controller')

const userRouter = express.Router()

userRouter.post('/add-user',addNewUser)
userRouter.put('admin/update/:id',updateUser)
userRouter.delete('admin/delete/:id',deleteUser)
userRouter.get('/All',getAllUsers)
userRouter.get('/dashboard',adminDashboardData)

module.exports = userRouter
