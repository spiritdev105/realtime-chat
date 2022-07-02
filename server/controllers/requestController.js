import asyncHandler from 'express-async-handler'
import RequestModel from '../models/requestModel.js'

// @desc   Create request
// @route  POST api/request/:userId
// @access Private
export const createNewRequest = asyncHandler(async (req, res) => {
    let newRequest = new RequestModel(req.body)
    newRequest = await newRequest.save()
    res.status(201).json(newRequest)
})