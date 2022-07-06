import express from 'express'
import { allMessages, createMessage } from '../controllers/messageController.js'
import { verifyUser } from '../middlewares/tokenMiddleware.js'

const router = express.Router()

router.post('/:userId', verifyUser, createMessage)
router.post('/all/:userId', verifyUser, allMessages)

export default router