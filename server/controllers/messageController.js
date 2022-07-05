import asyncHandler from 'express-async-handler'
import MessageModel from '../models/messageModel.js'

// @desc   Create message
// @route  POST api/message/:userId
// @access Private
export const createMessage = asyncHandler(async (req, res) => {
    let newMessage = new MessageModel(req.body)
    newMessage = await newMessage.save()
    res.status(201).json(newMessage)
})