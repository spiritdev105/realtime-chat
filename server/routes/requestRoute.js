import express from 'express'
import { allRequests, createNewRequest, deleteRequest } from '../controllers/requestController.js'
import { verifyUser } from '../middlewares/tokenMiddleware.js'

const router = express.Router()

router.route('/:userId')
    .post(verifyUser, createNewRequest)
    .get(verifyUser, allRequests)
    .delete(verifyUser, deleteRequest)

export default router