import { Request, Response } from 'express'

import { UserServices } from '../../Services/User/user.service.js'
import { userValidation } from '../../Utils/validation.utils.js'

import { IUserRegisterRequest } from '../../Interface/IUser.interface.js'

const registerController = async (req: Request<{ body: IUserRegisterRequest }>, res: Response): Promise<void> => {
    if (!req.body) {
        res.sendStatus(400)
        return
    }
    if (!req.body.username) {
        res.status(400).json(['Nome de usuário e um campo obrigatório'])
        return
    } else {
        const { error } = userValidation.validate(req.body, { abortEarly: false })
        if (error) {
            const details = error.details.map(e => e.message)
            res.status(400).json(details)
            return
        }
    }
    const { username, email, password } = req.body as IUserRegisterRequest
    const User = new UserServices()
    try {
        const data = await User.register(username, email, password)
        if (!data.success) {
            res.status(400).json(data)
            return
        }

        res.status(201).json(data)
    } catch (error) {
        res.status(500).json(error)
        return
    }

}

export { registerController }