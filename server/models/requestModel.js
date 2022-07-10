import mongoose from 'mongoose'

const requestSchema = new mongoose.Schema({
    receiverId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    senderId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    senderUsername: {
        type: String,
        required: true
    },
    senderImage: {
        type: String
    }
}, { timestamps: true })

export default mongoose.model('Request', requestSchema)