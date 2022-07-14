import { Server } from 'socket.io'
import dotenv from 'dotenv'

dotenv.config()

//starting the server
const io = new Server(process.env.PORT || 3001, {
    cors: {
        origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000'
    }
})

//all active users
let activeUsers = []

//add user to activeUsers array
const addUser = (socketId, userId) => {
    !activeUsers.some(u => u.socketId === socketId && u.userId === userId)
        && activeUsers.push({ socketId, userId })
}

//remove user from activeUsers array
const removeUser = (socketId) => {
    activeUsers = activeUsers.filter(u => u.socketId !== socketId)
}

//find user from activeUsers array
const findUser = (userId) => {
    return activeUsers.find(u => u.userId === userId)
}

//socket instance
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

    //receive requests
    socket.on('sendRequest', (userData) => {
        const user = findUser(userData.receiverId)
        if (!user) return
        socket.to(user.socketId).emit('receiveRequest', userData)
    })

    //save conversations
    socket.on('sendConversation', (conversation) => {
        const toUsers = []

        conversation.members.forEach((member) => {
            const user = findUser(member.memberId)
            if (user) {
                toUsers.push(user.socketId)
            }
        })

        if (!toUsers.length) return
        socket.to(toUsers).emit('saveConversation', conversation)
    })

    //delete request
    socket.on('sendDeletedRequest', ({ requestId, senderId, reqMsg }) => {
        const user = findUser(senderId)
        if (!user) return
        socket.to(user.socketId).emit('deleteRequest', { requestId, reqMsg })
    })

    //remove conversation
    socket.on('sendRmConversation', ({ cid, rmMsg, members, removerId }) => {
        const friend = members.find(m => m.memberId !== removerId)
        const user = findUser(friend.memberId)
        if (!user) return
        socket.to(user.socketId).emit('rmConversation', { rmMsg, cid })
    })
})