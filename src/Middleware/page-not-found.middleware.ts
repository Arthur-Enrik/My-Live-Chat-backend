import { Request, Response } from "express"

const notFound = async (req: Request, res: Response): Promise<void> => {
    res.status(404).json({ message: 'Rota não encontrada!' })
}

export { notFound }