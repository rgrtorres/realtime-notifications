const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static('public'))


// Lidar com conexões Socket.io
io.on('connection', (socket) => {
  console.log('Novo cliente conectado', socket.id);

  socket.on('sendNotification', (data) => {
    console.log('notificação enviada')
    io.emit('receiveNotification', data)
  })

  socket.on('disconnect', (reason) => {
    console.log('Cliente desconectado:', socket.id, 'Motivo:', reason);
  });
})

const PORT = 3000
server.listen(PORT, () => {
  console.log('Server running')
})