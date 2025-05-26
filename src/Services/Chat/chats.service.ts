import { User } from "../../Model/user.model.js";

import { Response } from "../../Utils/services-response.utils.js";

import { parseChats } from "../../Utils/parse-chat.utils.js";
import { io } from "../../server.js";

import { Response as IResponse } from "../../Interface/IResponse.interface.js";

class UserContactsServices {
	static add = async (adderId: string, email: string, nickname?: string): Promise<IResponse> => {
		try {
			const adderUser = await User.findById(adderId).select("+chats");
			const toAddUser = await User.findOne({ email: email }).select("+chats");

			if (!adderUser) return Response.error("Usuário não encontrado", "NOT_FOUND");
			if (!toAddUser) return Response.error("Usuário não encontrado", "NOT_FOUND");

			const existentChats = Object.keys(parseChats(adderUser.chats));
			if (existentChats.some((item) => item === toAddUser._id))
				return Response.error("Esse usuário já foi adicionado!", "CONFLICT");

			adderUser.chats.set(toAddUser._id, {
				_id: toAddUser._id,
				username: toAddUser.username,
				nickname: nickname ? nickname : undefined,
			});
			toAddUser.chats.set(adderUser._id, {
				_id: adderUser._id,
				username: adderUser.username,
			});

			await adderUser.save();
			await toAddUser.save();

			io.to(adderUser._id).emit("chatHasBeenUpdated");
			io.to(toAddUser._id).emit("chatHasBeenUpdated");

			return Response.success("Usuário adicionado com sucesso!");
		} catch (error) {
			console.log(error);
			throw new Error("Ocorreu um erro no servidor, tente novamente mais tarde");
		}
	};
	static get = async (_id: string): Promise<IResponse> => {
		try {
			const user = await User.findById(_id).select("+chats");
			if (!user) return Response.error("Usuário não encontrado", "NOT_FOUND");

			return Response.success("", { chats: parseChats(user.chats) });
		} catch (error) {
			console.log(error);
			throw new Error("Ocorreu um erro no servidor, tente novamente mais tarde");
		}
	};
	static save = async (senderId: string, receiverId: string, message: string) => {
		try {
			const senderUser = await User.findById(senderId).select("+chats");
			const receiverUser = await User.findById(receiverId).select("+chats");

			if (!senderUser || !receiverUser) return;

			const senderChat = senderUser.chats.get(receiverId);
			const receiverChat = receiverUser.chats.get(senderId);

			if (!senderChat || !receiverChat) return;

			senderChat.messages?.push({
				message,
				isOwner: true,
				id: crypto.randomUUID(),
			});
			receiverChat.messages?.push({
				message,
				isOwner: false,
				id: crypto.randomUUID(),
			});

			senderUser.chats.set(receiverId, senderChat);
			receiverUser.chats.set(senderId, receiverChat);

			await senderUser?.save();
			await receiverUser?.save();
		} catch (error) {
			console.log(error);
		}
	};
}

export { UserContactsServices };
