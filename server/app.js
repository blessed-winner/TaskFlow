const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user.route')
const deptRouter = require('./routes/dept.route')
const authRouter = require('./routes/auth.route')
const taskRouter = require('./routes/task.route')
const http = require('http')
const{ Server } = require('socket.io')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const app = express()


app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>res.send("API is working"))
app.use('/api/auth',authRouter)
app.use('/api/users',userRouter)
app.use('/api/departments',deptRouter)
app.use('/api/tasks',taskRouter)


const port = process.env.PORT || 8000

const server = http.createServer(app)
const io = new Server(server,{
    cors: {origin:'*', methods:[ 'GET','POST' ]}
})

// Socket authentication middleware
io.use((socket, next) => {
    const token = socket.handshake.auth.token
    if (!token) {
        return next(new Error('Authentication error: No token provided'))
    }
    
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        socket.userId = payload.id
        socket.userRole = payload.role
        next()
    } catch (error) {
        next(new Error('Authentication error: Invalid token'))
    }
})

io.on('connection',(socket)=>{
    console.log('A client connected',socket.id, 'User ID:', socket.userId)
    
    socket.on('join-user-room',(userId)=>{
        // Verify user can only join their own room
        if (socket.userId !== userId) {
            return socket.emit('error', 'Unauthorized: Cannot join this room')
        }
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