// Services
import { Response } from "../Utils/services-response.utils.js";
import { UserServices } from "../Services/User/user.service.js";

// Interfaces
import { IPayload } from "../Interface/IPayload.interface.js";

function UserPayloadValidation(user: IPayload) {
	if (!user) {
		return Response.error("Ocorreu um erro no servidor, Tente novamente mais tarde", "SERVER_ERR");
	}

	const userExist = UserServices.findById(user._id);

	if (!userExist) {
		return Response.error("Usuário não existe", "NOT_FOUND");
	}
}

export { UserPayloadValidation };
