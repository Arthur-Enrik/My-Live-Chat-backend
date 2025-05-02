import { Request, Response } from 'express'

import { UserServices } from '../../Services/User/user.service.js'

const getUserByEmail = async (req: Request, res: Response): Promise<void> => {
    if (!req.query || !req.query.email) {
        res.sendStatus(400)
        return
    }
    const email = req.query.email as string
    const User = new UserServices()
    try {
        const data = await User.getByEmail(email)
        if (!data.success) {
            res.sendStatus(400)
            return
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}

export { getUserByEmail }