import mongoose from 'mongoose'

const conversationSchema = mongoose.Schema({
    members: [
        {
            memberId: String,
            memberUsername: String,
            memberImage: String
        }
    ]
}, { timestamps: true })

export default mongoose.model('Conversation', conversationSchema)