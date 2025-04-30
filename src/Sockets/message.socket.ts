import { Server } from "socket.io";
import { UserContactsServices } from "../Services/Chat/chats.service.js";

const message = (io: Server, userId: string, receivedData: any) => {
    const { receivedId, message } = receivedData
    if (!receivedData || !receivedId || !message) return

    const Chats = new UserContactsServices()

    Chats.save(userId, receivedId, message)

    io.to(receivedId).emit('message:received', { from: userId, message })
}

export { message }