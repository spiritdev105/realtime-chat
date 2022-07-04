import express from 'express'
import { createConversation } from '../controllers/conversationController.js'
import { verifyUser } from '../middlewares/tokenMiddleware.js'

const router = express.Router()

router.post('/:userId', verifyUser, createConversation)

export default router