import express from 'express'
import { createMessage } from '../controllers/messageController.js'
import { verifyUser } from '../middlewares/tokenMiddleware.js'

const router = express.Router()

router.route('/:userId/:cid')
    .post(verifyUser, createMessage)

export default router