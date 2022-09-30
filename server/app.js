import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'
import http from 'http'

const app = express()
app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

app.get('/', (req, res) => {
  console.log('app is running ')
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('chat message', (msg) => {
    // console.log(socket)
    io.local.emit('chat message', msg)
  })
  // socket.on('chat message', (msg) => {
  //   io.emit('chat message', msg)
  // })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(5000, () => {
  console.log('Server running on port 5000')
})
