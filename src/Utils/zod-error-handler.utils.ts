import { ZodError } from "zod";

import { Response } from "./services-response.utils.js";

function zodErrorHandler(errors: ZodError) {
  let errorsArray = errors.issues.map((error) => error.message);
  return Response.error("Erro ao registrar usuário", "UNPROCESSABLE_ENTITY", {
    errors: errorsArray,
  });
}

export { zodErrorHandler };
