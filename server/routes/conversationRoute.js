import express from 'express'
import { allConversations, createConversation } from '../controllers/conversationController.js'
import { verifyUser } from '../middlewares/tokenMiddleware.js'

const router = express.Router()

router.route('/:userId')
    .post(verifyUser, createConversation)
    .get(verifyUser, allConversations)

export default router