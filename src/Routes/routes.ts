import express from "express";

const router = express.Router()

import { helpController } from "../Controllers/Help/helper.controller.js";

import { UserRoute } from './User/user.route.js'
import { ChatRoute } from "./Chat/chat.routes.js";

router.use('/api/users', UserRoute)
router.use('/api/chats', ChatRoute)

// router.get('/api/help', helpController)

export { router }