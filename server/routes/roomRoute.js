import express from 'express'
import { createRoom, getRooms, joinRoom, leaveRoom } from '../controllers/roomController.js'
import { verifyUser } from '../middlewares/tokenMiddleware.js'

const router = express.Router()

router.route('/:userId')
    .get(verifyUser, getRooms)
    .post(verifyUser, createRoom)
    .put(verifyUser, joinRoom)

router.delete('/:userId/:roomId', verifyUser, leaveRoom)

export default router