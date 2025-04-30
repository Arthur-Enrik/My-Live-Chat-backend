import { Request, Response } from 'express'
import { UserServices } from '../../Services/User/user.service.js'

const getUserController = async (req: Request, res: Response): Promise<void> => {
    if (!req.params || !req.params._id) {
        res.sendStatus(400)
        return
    }
    const _id = req.params._id
    const User = new UserServices()
    try {
        const data = await User.get(_id)
        if (!data.success) {
            res.status(404).json(data)
            return
        } else {
            res.status(200).json(data)
            return
        }
    } catch (error) {
        res.status(500).json(error)
        return
    }
}

export { getUserController }