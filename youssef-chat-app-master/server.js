const express = require('express')
const socketio = require('socket.io')
const http = require("http")
const path = require("path")



const app = express()
const server = http.createServer(app)

const io = socketio(server)

let users = []

app.get('/users', (req, res) => {
  res.send({ users })
})

io.on('connection', (socket) => {
  socket.on('Joined', (data) => {
    console.log('Someone Connected')
    users.push({ id: socket.id, name: data })

    socket.broadcast.emit('UserJoined', `${data} Joined`)
  })

  socket.on('message', (data) => {
    socket.broadcast.emit('newMessage', {
      msg: data,
      sender: users.find((e) => e.id === socket.id)
        ? users.find((e) => e.id === socket.id).name
        : 'Someone',
    })
  })

  socket.on('disconnect', () => {
    console.log('Someone Disconnected')
    const leftUser = users.find((e) => e.id === socket.id)
    if (leftUser) {
      const newUsers = users.filter((e) => e.id !== socket.id)
      users = newUsers

      io.emit('UserJoined', `${leftUser.name} Disconnected`)
    }
  })
})

app.use(express.static(path.join(__dirname, './frontend')))

const port = 3000

server.listen(port, () => {
  console.log(`Click here Youssef to open Server ~ http://localhost:${port}`)
})
