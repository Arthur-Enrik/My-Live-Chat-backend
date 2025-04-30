import { User } from "../../Model/user.model.js"

import { BaseResponse } from "../../Interface/IUserServicesTypes.interface.js"
import { GetContactsResponse } from '../../Interface/IUserServicesTypes.interface.js'

import { parseChats } from "../../Utils/parseChat.utils.js"
import { io } from "../../server.js"

class UserContactsServices {
    add = async (adderId: string, email: string, nickname?: string): Promise<BaseResponse> => {
        try {

            const adderUser = await User.findById(adderId).select('+chats')
            const toAddUser = await User.findOne({ email: email }).select('+chats')

            if (!adderUser) return {
                success: false,
                message: 'Id do usuário invalida',
                err: 'NOT_FOUND'
            } as BaseResponse
            if (!toAddUser) return {
                success: false,
                message: 'Esse email não está cadastrado',
                err: 'NOT_FOUND'
            } as BaseResponse

            const existentChats = Object.keys(parseChats(adderUser.chats))
            if (existentChats.some((item) => item === toAddUser._id)) return {
                success: false,
                message: 'Você já adicionou esse usuário',
                err: "CONFLICT"
            } as BaseResponse
            // Adicionar uma verificação de duplicidade de nickname

            adderUser.chats.set(toAddUser._id, {
                _id: toAddUser._id,
                username: toAddUser.username,
                nickname: nickname ? nickname : undefined,
            })
            toAddUser.chats.set(adderUser._id, {
                _id: adderUser._id,
                username: adderUser.username,
            })

            await adderUser.save()
            await toAddUser.save()


            io.to(adderUser._id).emit('chatHasBeenUpdated', parseChats(adderUser.chats))
            io.to(toAddUser._id).emit('chatHasBeenUpdated', parseChats(toAddUser.chats))

            return {
                success: true,
                message: 'Chat cadastrado com sucesso!'
            } as BaseResponse

        } catch (error) {
            console.log(error)
            throw new Error('Ocorreu um erro no servidor, tente novamente mais tarde')
        }
    }
    get = async (_id: string): Promise<GetContactsResponse | BaseResponse> => {
        try {
            const user = await User.findById(_id).select('+chats')
            if (!user) return {
                success: false,
                message: 'Usuário não encontrado',
                err: "NOT_FOUND"
            } as BaseResponse

            return {
                success: true,
                message: 'Chats encontrado com sucesso!',
                chats: parseChats(user.chats)
            } as GetContactsResponse

        } catch (error) {
            console.log(error)
            throw new Error('Ocorreu um erro no servidor, tente novamente mais tarde')
        }
    }
    save = async (senderId: string, receiverId: string, message: string) => {
        try {
            const senderUser = await User.findById(senderId).select('+chats')
            const receiverUser = await User.findById(receiverId).select('+chats')

            if (!senderUser || !receiverUser) return

            const senderChat = senderUser.chats.get(receiverId)
            const receiverChat = receiverUser.chats.get(senderId)

            if (!senderChat || !receiverChat) return

            senderChat.messages?.push({ message, isOwner: true, id: crypto.randomUUID() })
            receiverChat.messages?.push({ message, isOwner: false, id: crypto.randomUUID() })

            senderUser.chats.set(receiverId, senderChat)
            receiverUser.chats.set(senderId, receiverChat)

            await senderUser?.save()
            await receiverUser?.save()

        } catch (error) {
            console.log(error)
        }
    }
}

export { UserContactsServices }