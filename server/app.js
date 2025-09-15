const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user.route')
const deptRouter = require('./routes/dept.route')
const authRouter = require('./routes/auth.route')
const taskRouter = require('./routes/task.route')
const http = require('http')
const{ Server } = require('socket.io')
require('dotenv').config()

const app = express()


app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>res.send("API is working"))
app.use('/api/auth',authRouter)
app.use('/api/users',userRouter)
app.use('/api/departments',deptRouter)
app.use('/api/tasks',taskRouter)


const port = process.env.PORT || 3000

const server = http.createServer()
const io = new Server(server,{
    cors: {origin:'http://localhost:5173', methods:[ 'GET','POST' ]}
})

io.on('connection',(socket)=>{
    console.log('A client connected',socket.id)
    socket.on('join-user-room',(userId)=>{
        socket.join(`user-${userId}`)
        console.log(`User ${userId} joined their room` )
    })

    socket.on('leave-user-room',(userId)=>{
        socket.leave(`user-${userId}`)
        console.log(`User ${userId} left their room`)
    })

    socket.on('disconnect',(reason)=>{
       console.log('A client disconnected',socket.id,'Reason:',reason)
    })
})


app.set('io',io)


server.listen(port,() => console.log(`Server running on port ${port}`))