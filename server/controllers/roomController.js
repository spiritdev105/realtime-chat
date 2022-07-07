import asyncHandler from 'express-async-handler'
import RoomModel from '../models/roomModel.js'

// @desc   Get rooms
// @route  GET api/room/:userId
// @access Private
export const getRooms = asyncHandler(async (req, res) => {
    const allRooms = await RoomModel.find({ members: { $in: [req.user.id] } })
    res.status(200).json(allRooms)
})


// @desc   Create room
// @route  POST api/room/:userId
// @access Private
export const createRoom = asyncHandler(async (req, res) => {
    const checkRoom = await RoomModel.find({ roomName: req.body.roomName })
    if (checkRoom) {
        res.status(400)
        throw new Error('Room already exists.')
    }

    let newRoom = new RoomModel(req.body)
    newRoom = await newRoom.save()
    res.status(201).json({ newRoom, message: 'Successfully created' })
})

// @desc   Join room
// @route  PUT api/room/:userId
// @access Private
export const joinRoom = asyncHandler(async (req, res) => {
    const checkUser = await RoomModel.countDocuments({ _id: req.body.roomId, members: { $in: [req.user.id] } })
    if (checkUser) {
        res.status(400)
        throw new Error('You are already in the room')
    }

    const room = await RoomModel.findByIdAndUpdate(req.body.roomId, { $push: { members: req.user.id } }, { new: true })
    res.status(200).json({ room, message: 'Successfully joined' })
})

// @desc   Leave room
// @route  DELETE api/room/:userId/:roomId
// @access Private
export const leaveRoom = asyncHandler(async (req, res) => {
    const { roomId } = req.params
    await RoomModel.findByIdAndUpdate(roomId, { $pull: { members: req.user.id } })
    res.status(200).json({ roomId, message: 'Successfully leaved the room' })
})