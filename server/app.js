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
const { PrismaClient } = require('./generated/prisma')
const prisma = new PrismaClient()


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

const activeUsers = new Map()

io.on('connection', (socket) => {
  console.log('A client connected', socket.id)

  socket.on('join-user-room', async (userId) => {
    const parsedId = Number(userId) // always use number for consistency
    socket.join(parsedId.toString()) // rooms are always strings

    if (!activeUsers.has(parsedId)) {
      activeUsers.set(parsedId, new Set())
    }
    activeUsers.get(parsedId).add(socket.id)

    await prisma.user.update({
      where: { id: parsedId },
      data: { status: "ACTIVE" }
    })

    console.log(`Socket ${socket.id} joined room ${parsedId}`)
  })

  socket.on('leave-user-room', async (userId) => {
    const parsedId = Number(userId)
    socket.leave(parsedId.toString())

    if (activeUsers.has(parsedId)) {
      activeUsers.get(parsedId).delete(socket.id)

      if (activeUsers.get(parsedId).size === 0) {
        activeUsers.delete(parsedId)

        await prisma.user.update({
          where: { id: parsedId },
          data: { status: "AWAY" }
        })
      }
    }

    console.log(`Socket ${socket.id} left room ${parsedId}`)
  })

  socket.on('disconnect', (reason) => {
    console.log('A client disconnected', socket.id, 'Reason:', reason)
  })
})



server.listen(port,() => console.log(`Server running on port ${port}`))