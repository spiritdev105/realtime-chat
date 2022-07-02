import mongoose from 'mongoose'

const requestSchema = new mongoose.Schema({
    senderId: mongoose.SchemaTypes.ObjectId,
    senderUsername: String,
    senderImage: String
}, { timestamps: true })

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    imageName: String,
    imageUrl: String,
    requests: [requestSchema],
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export default mongoose.model('User', userSchema)