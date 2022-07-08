import asyncHandler from "express-async-handler"
import conversationModel from "../models/conversationModel.js"
import MessageModel from "../models/messageModel.js"

// @desc   Create conversation
// @route  POST api/conversation/:userId/
// @access Private
export const createConversation = asyncHandler(async (req, res) => {
    let newConversation = new conversationModel(req.body)
    newConversation = await newConversation.save()
    res.status(201).json(newConversation)
})

// @desc   all conversations
// @route  POST api/conversation/:userId/
// @access Private
export const allConversations = asyncHandler(async (req, res) => {
    const userId = req.user.id
    let conversations = await conversationModel.find({ members: { $elemMatch: { memberId: userId } } })
    res.status(200).json(conversations)
})

// @desc   Delete conversation
// @route  DELETE api/conversation/:userId/:cid
// @access Private
export const deleteConversation = asyncHandler(async (req, res) => {
    const { cid } = req.params
    await Promise.all([
        conversationModel.deleteOne({ _id: cid }),
        MessageModel.deleteMany({ conversationId: cid })
    ])
    res.status(200).json({ cid, message: 'Removed friend from friend list' })
})