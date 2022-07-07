import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
    members: [mongoose.SchemaTypes.ObjectId],
    roomName: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

export default mongoose.model("Room", roomSchema)