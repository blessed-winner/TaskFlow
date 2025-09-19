const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user.route')
const deptRouter = require('./routes/dept.route')
const authRouter = require('./routes/auth.route')
const taskRouter = require('./routes/task.route')
require('dotenv').config()
const http = require('http')
const { initIO } = require('./utils/notifications')
const noteRouter = require('./routes/notification.route')


const app = express()


app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>res.send("API is working"))
app.use('/api/auth',authRouter)
app.use('/api/users',userRouter)
app.use('/api/departments',deptRouter)
app.use('/api/tasks',taskRouter)
app.use('/api/notifications',noteRouter)


const port = process.env.PORT || 3000

const server = http.createServer(app)

const io = initIO(server)

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


server.listen(port,() => console.log(`Server running on port ${port}`))