import asyncHandler from "express-async-handler"
import conversationModel from "../models/conversationModel.js"

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