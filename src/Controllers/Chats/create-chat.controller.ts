import { Request, Response } from "express";
import { UserContactsServices } from "../../Services/Chat/chats.service.js";

const createUserChat = async (req: Request, res: Response): Promise<void> => {
	const _id = req.user?._id as string;
	if (!req.body || !req.body.email) {
		res.sendStatus(400);
		return;
	} else if (!req.user || !req.user?._id) {
		res.sendStatus(500);
		return;
	}
	try {
		const data = await UserContactsServices.add(_id, req.body.email, req.body.nickname);
		if (!data.success) {
			switch (data.err) {
				case "NOT_FOUND":
					res.status(404).json(data);
					break;
				case "CONFLICT":
					res.status(409).json(data);
					break;
				default:
					res.status(500).json("ocorreu um erro desconhecido, tente novamente mais tarde");
					break;
			}
			return;
		}

		res.status(200).json(data);
	} catch (error) {
		res.status(500).json(error);
		return;
	}
};

export { createUserChat };
