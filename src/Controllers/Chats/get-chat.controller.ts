import { Request, Response } from "express";
import { UserContactsServices } from "../../Services/Chat/chats.service.js";

const getUserChat = async (req: Request, res: Response): Promise<void> => {
	const _id = req.user?._id as string;
	if (!req.user || !req.user?._id) {
		res.sendStatus(401);
		return;
	}
	try {
		const data = await UserContactsServices.get(_id);
		if (!data.success) {
			switch (data.err) {
				case "NOT_FOUND":
					res.status(404).json(data);
					break;
				default:
					res.status(500).json("ocorreu um erro desconhecido, tente novamente mais tarde");
			}
			return;
		}
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json(error);
		return;
	}
};

export { getUserChat };
