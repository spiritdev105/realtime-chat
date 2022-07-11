import { Server } from 'socket.io'
import dotenv from 'dotenv'

dotenv.config()

const io = new Server(process.env.PORT || 3001, {
    cors: {
        origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000'
    }
})

io.on('connection', (socket) => {
    const userId = socket.handshake.query.id
    console.log(userId)
})