import express from 'express'
import { createNewRequest } from '../controllers/requestController.js'
import { verifyUser } from '../middlewares/tokenMiddleware.js'

const router = express.Router()

router.post('/:userId', verifyUser, createNewRequest)

export default router