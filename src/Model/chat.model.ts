import { Schema } from 'mongoose'

const ChatSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: false,
    },
    messages: {
        required: false,
        type: [{
            message: String,
            isOwner: Boolean,
            messageId: String
        }],
        default: []
    }
}, { _id: false })

export { ChatSchema }