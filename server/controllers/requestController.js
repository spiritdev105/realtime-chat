import asyncHandler from 'express-async-handler'
import RequestModel from '../models/requestModel.js'

// @desc   Create request
// @route  POST api/request/:userId
// @access Private
export const createNewRequest = asyncHandler(async (req, res) => {
    let newRequest = new RequestModel(req.body)
    newRequest = await newRequest.save()
    res.status(201).json({ message: 'Successfully sent request', newRequest })
})

// @desc   All requests
// @route  GET api/request/:userId
// @access Private
export const allRequests = asyncHandler(async (req, res) => {
    const allRequests = await RequestModel.find()
    res.status(201).json(allRequests)
})