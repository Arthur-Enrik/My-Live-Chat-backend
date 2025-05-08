import { Request, Response } from 'express'
import { UserContactsServices } from '../../Services/Chat/chats.service.js'

const createUserChat = async (req: Request, res: Response): Promise<void> => {
    const _id = req.user?._id as string
    if (!req.body || !req.body.email) {
        res.sendStatus(400)
        return
    } else if (!req.user || !req.user?._id) {
        res.sendStatus(500)
        return
    }
    const User = new UserContactsServices()
    try {
        const data = await User.add(_id, req.body.email, req.body.nickname)
        if (!data.success) {
            if (data.err === 'NOT_FOUND') {
                res.status(404).json(data)
            } else if (data.err === 'CONFLICT') {
                res.status(409).json(data)
            } else {
                res.status(400).json(data)
            }
        } else {
            res.status(200).json(data)
            return
        }
    } catch (error) {
        res.status(500).json(error)
        return
    }
}

export { createUserChat }