import asyncHandler from 'express-async-handler'
import MessageModel from '../models/messageModel.js'

// @desc   Create message
// @route  POST api/message/:userId/:cid
// @access Private
export const createMessage = asyncHandler(async (req, res) => {
    const { cid } = req.params
    let newMessage = new MessageModel({ ...req.body, conversationId: cid })
    newMessage = await newMessage.save()
    res.status(201).json(newMessage)
})