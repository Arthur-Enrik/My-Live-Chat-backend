import { Request, Response } from 'express'
import { UserServices } from '../../Services/User/user.service.js'

const deleteController = async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
        res.sendStatus(400)
    }
    const _id = req.user?._id as string
    const User = new UserServices()
    try {
        const data = await User.delete(_id)
        if (!data.success) {
            res.status(404).json(data)
        } else {
            res.status(200).json(data)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export { deleteController }