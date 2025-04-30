import { Request, Response } from 'express'
import path from 'path'

const helpController = async (req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), 'public', 'help', 'help.html'))
}

export { helpController }