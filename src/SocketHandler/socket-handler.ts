import { Socket, Server } from "socket.io"

import { message } from "../Sockets/message.socket.js"

const socketHandler = (socket: Socket, io: Server) => {
    const userId = socket.data.userId as string

    socket.join(userId)

    socket.on('message:sended', (data) => { message(io, userId, data) })
}

export { socketHandler }