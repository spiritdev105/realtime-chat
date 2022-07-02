import mongoose from 'mongoose'

const conversationSchema = new mongoose.Schema({
    receiverId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    },
    SenderId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    },

}, { timestamps: true })