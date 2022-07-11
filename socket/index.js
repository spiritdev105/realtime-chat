import { Server } from 'socket.io'
import dotenv from 'dotenv'

dotenv.config()

const io = new Server(process.env.PORT || 3001, {
    cors: {
        origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000'
    }
})

let activeUsers = []

const addUser = (socketId, userId) => {
    !activeUsers.some(u => u.socketId === socketId && u.userId === userId)
        && activeUsers.push({ socketId, userId })
}

const removeUser = (socketId) => {
    activeUsers = activeUsers.filter(u => u.socketId !== socketId)
}

io.on('connection', (socket) => {
    const userId = socket.handshake.query.id
    addUser(socket.id, userId)

    //send active users
    io.emit('allActiveUsers', activeUsers)

    //remove active user
    socket.on('disconnect', () => {
        removeUser(socket.id)
        io.emit('allActiveUsers', activeUsers)
    })
})