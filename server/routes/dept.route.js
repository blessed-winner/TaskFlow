const express = require('express')
const { createDepartment, getAllDepartments } = require('../controllers/dept.controller')
const deptRouter = express.Router()

deptRouter.post('/add-department',createDepartment)
deptRouter.get('/All',getAllDepartments)

module.exports = deptRouter