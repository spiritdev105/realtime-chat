import mongoose from 'mongoose'

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
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export default mongoose.model('User', userSchema)