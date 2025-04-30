import { Socket } from 'socket.io'

import { validateToken as validateTokenUtils } from '../Utils/validate-token.utils.js'

type Next = (err?: Error) => void

const validateToken = async (socket: Socket, next: Next) => {
    const token = socket.handshake.auth.token as string
    if (!token) {
        return next(new Error('Token não fornecido'))
    }
    try {
        const payload = validateTokenUtils(token)
        socket.data.userId = payload._id
        next()
    } catch (error) {
        next(new Error('Token invalido'))
    }
}

export { validateToken }