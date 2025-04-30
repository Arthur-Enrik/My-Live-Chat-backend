import { Schema, model } from 'mongoose'
import { ChatSchema } from './chat.model.js'

const UserSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    chats: {
        type: Map,
        of: ChatSchema,
        default: {},
        select: false
    }
}, { _id: false })

const User = model('Users', UserSchema)

export { User }