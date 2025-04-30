import express from 'express'

const ChatRoute = express.Router()

import { tokenValidation } from '../../Middleware/token-validation.middleware.js'

import { createUserChat } from '../../Controllers/Chats/create-chat.controller.js'
import { getUserChat } from '../../Controllers/Chats/get-chat.controller.js'

ChatRoute.post('/', tokenValidation, createUserChat)
ChatRoute.get('/', tokenValidation, getUserChat)

export { ChatRoute }