const express = require('express')
const { createDepartment, getAllDepartments, deleteDepartment } = require('../controllers/dept.controller')
const deptRouter = express.Router()

deptRouter.post('/add-department',createDepartment)
deptRouter.get('/All',getAllDepartments)
deptRouter.delete('/delete/:id',deleteDepartment)

module.exports = deptRouter