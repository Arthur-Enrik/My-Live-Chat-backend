import { Request, Response } from 'express'
import { UserContactsServices } from '../../Services/Chat/chats.service.js'

const getUserChat = async (req: Request, res: Response): Promise<void> => {
    const _id = req.user?._id as string
    if (!req.user || !req.user?._id) {
        res.sendStatus(401)
        return
    }
    const User = new UserContactsServices()
    try {
        const data = await User.get(_id)
        if (!data.success) {
            res.status(400).json(data)
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

export { getUserChat }