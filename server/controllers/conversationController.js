import asyncHandler from "express-async-handler"
import conversationModel from "../models/conversationModel.js"

// @desc   Create conversation
// @route  POST api/request/:userId/
// @access Private
export const createConversation = asyncHandler(async (req, res) => {
    const newConversation = new conversationModel(req.body)
    newConversation = await newConversation.save()
    res.status(201).json(newConversation)
})