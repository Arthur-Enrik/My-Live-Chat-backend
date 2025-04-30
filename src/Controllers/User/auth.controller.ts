import { Request, Response } from 'express'

import { userValidation } from '../../Utils/validation.utils.js'

import { IUserAuthRequest } from '../../Interface/IUser.interface.js'
import { UserServices } from '../../Services/User/user.service.js'

const authorizeController = async (req: Request<{ body: IUserAuthRequest }>, res: Response): Promise<void> => {
    if (!req.body) {
        res.sendStatus(400)
        return
    }
    const { error } = userValidation.validate(req.body, { abortEarly: false })
    if (error) {
        const details = error.details.map(e => e.message)
        res.status(400).json(details)
        return
    } else {
        const { email, password } = req.body as IUserAuthRequest
        const User = new UserServices()
        try {
            const data = await User.authorize(email, password)

            if (!data.success && !data.err) {
                res.status(404).json(data)
                return
            } else if (data.err) {
                res.status(401).json(data)
                return
            } else {
                res.status(200).json(data)
            }
        } catch (error) {
            res.status(500).json(error)
            return
        }
    }
}

export { authorizeController }