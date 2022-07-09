import asyncHandler from 'express-async-handler'
import RoomModel from '../models/roomModel.js'
import MessageModel from '../models/messageModel.js'
import mongoose from 'mongoose'

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
    let newRoom = new RoomModel(req.body)
    newRoom = await newRoom.save()
    res.status(201).json({ newRoom, message: 'Successfully created' })
})

// @desc   Join room
// @route  PUT api/room/:userId
// @access Private
export const joinRoom = asyncHandler(async (req, res) => {
    // const rooms = await RoomModel.find()

    // let checkRoom = rooms.find(r => r._id === req.body.roomId)
    const checkId = mongoose.Types.ObjectId.isValid(req.body.roomId)
    if (!checkId) {
        res.status(400)
        throw new Error('Invalid id')
    }

    let checkRoom = await RoomModel.findById(req.body.roomId)
    if (!checkRoom) {
        res.status(400)
        throw new Error('Incorrect roomId')
    }

    if (checkRoom.members.includes(req.user.id)) {
        res.status(400)
        throw new Error('You are already in the room')
    }

    checkRoom.members.push(req.user.id)
    const room = await checkRoom.save()
    res.status(200).json({ room, message: 'Successfully joined' })
})

// @desc   Leave room
// @route  DELETE api/room/:userId/:roomId
// @access Private
export const leaveRoom = asyncHandler(async (req, res) => {
    const { roomId } = req.params

    const room = await RoomModel.findOne({ _id: roomId })

    if (room.members.length > 1) {
        await RoomModel.findByIdAndUpdate(roomId, { $pull: { members: req.user.id } })
    } else {
        await Promise.all([
            RoomModel.deleteOne({ _id: roomId }),
            MessageModel.deleteMany({ conversationId: roomId })
        ])
    }

    res.status(200).json({ roomId, message: 'Successfully leaved the room' })
})