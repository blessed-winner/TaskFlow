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

const server = http.createServer(app)
const io = new Server(server,{
    cors: {origin:'http://localhost:5173', methods:[ 'GET','POST' ]}
})

io.on('connection',(socket)=>{
    console.log('A client connected',socket.id)
    socket.on('join-user-room',(room)=>{
        socket.join(room)
        console.log(`Socket ${socket.id} joined room ${room}` )
    })

    socket.on('leave-user-room',(room)=>{
        socket.leave(room)
        console.log(`Socket ${socket.id} left room ${room}`)
    })


    socket.on('disconnect',(reason)=>{
       console.log('A client disconnected',socket.id,'Reason:',reason)
    })
})


module.exports.sendNotifications = (room,notification) => {
  io.to(room).emit('notification',notification)
}


server.listen(port,() => console.log(`Server running on port ${port}`))