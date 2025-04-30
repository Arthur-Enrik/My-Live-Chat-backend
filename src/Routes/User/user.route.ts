import express from 'express'

const UserRoute = express.Router()

import { tokenValidation } from '../../Middleware/token-validation.middleware.js'

import { authorizeController } from '../../Controllers/User/auth.controller.js'
import { registerController } from '../../Controllers/User/registration.controller.js'
import { deleteController } from '../../Controllers/User/delete.controller.js'
import { getUserController } from '../../Controllers/Chats/get-user.controller.js'

UserRoute.post('/auth', authorizeController)
UserRoute.post('/register', registerController)
UserRoute.delete('/', tokenValidation, deleteController)
UserRoute.get('/:_id', tokenValidation, getUserController)

export { UserRoute }