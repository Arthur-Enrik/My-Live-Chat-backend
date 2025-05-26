import { ZodError } from "zod";

import { Response } from "./services-response.utils.js";

function parseZodError(errors: ZodError) {
	let errorsArray = errors.issues.map((error) => {
		return { field: error.path[0], message: error.message };
	});
	return Response.error("Erro ao registrar usuário", "UNPROCESSABLE_ENTITY", {
		errors: errorsArray,
	});
}

export { parseZodError };
