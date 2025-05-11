import { Request, Response } from "express";

// Utils
import { registerBodyValidation } from "../../Utils/validation.utils.js";
import { zodErrorHandler } from "../../Utils/zod-error-handler.utils.js";
import { Response as ResponseUtils } from "../../Utils/services-response.utils.js";

//Services
import { UserServices } from "../../Services/User/user.service.js";

//Interfaces
import { ZodError } from "zod";
import { IUserRegisterRequest } from "../../Interface/IUser.interface.js";

const registerController = async (
  req: Request<{}, {}, IUserRegisterRequest>,
  res: Response
): Promise<void> => {
  try {
    registerBodyValidation.parse(req.body);
    // Adicionar classe para intermediar erros
    const { username, email, password } = req.body;
    const data = await UserServices.register(
      username.trim(),
      email.trim().toLowerCase(),
      password.trim()
    );

    if (!data.success) {
      if (data.err === "CONFLICT") {
        res.status(409).json(data);
        return;
      } else {
        res.status(500).json(data);
        return;
      }
    }

    res.status(201).json(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const data = zodErrorHandler(error);
      res.status(422).json(data);
    } else {
      console.error(error);
      res
        .status(500)
        .json(
          ResponseUtils.error(
            "Ocorreu um erro no servidor, Tente novamente mais tarde",
            "SERVER_ERR"
          )
        );
    }
  }
};

export { registerController };
