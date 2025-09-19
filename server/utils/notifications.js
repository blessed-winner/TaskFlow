const{ Server } = require('socket.io')

let io;

function initIO(server){
    io = new Server(server,{
    cors: {origin:'http://localhost:5173', methods:[ 'GET','POST' ]}
})

return io
}

const sendNotifications = (room,notification) => {
  io.to(room).emit('notification',notification)
}

module.exports = { initIO, sendNotifications }