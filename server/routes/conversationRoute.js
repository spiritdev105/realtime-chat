import express from 'express'
import { allConversations, createConversation, deleteConversation } from '../controllers/conversationController.js'
import { verifyUser } from '../middlewares/tokenMiddleware.js'

const router = express.Router()

router.route('/:userId')
    .post(verifyUser, createConversation)
    .get(verifyUser, allConversations)

router.delete('/:userId/:cid', verifyUser, deleteConversation)

export default router