const express = require('express')
const { PrismaClient } = require('./generated/prisma')
const cors = require('cors')
const userRouter = require('./routes/user.route')
const deptRouter = require('./routes/dept.route')
require('dotenv').config()

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>res.send("API is working"))
app.use('/api/users',userRouter)
app.use('/api/departments',deptRouter)


const port = process.env.PORT || 3000


app.listen(port,() => console.log(`Server running on port ${port}`))