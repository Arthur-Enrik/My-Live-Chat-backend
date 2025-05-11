import { Request, Response } from "express";
import { IUserAuthRequest } from "../../Interface/IUser.interface.js";

// Utils
import { loginBodyValidation } from "../../Utils/validation.utils.js";
import { Response as ResponseUtils } from "../../Utils/services-response.utils.js";

// Services
import { UserServices } from "../../Services/User/user.service.js";

const authorizeController = async (
  req: Request<{}, {}, IUserAuthRequest>,
  res: Response
): Promise<void> => {
  try {
    loginBodyValidation.parse(req.body);

    const { email, password } = req.body;
    const data = await UserServices.authorize(
      email.trim().toLowerCase(),
      password.trim()
    );

    if (!data.success) {
      switch (data.err) {
        case "NOT_FOUND":
          res.status(404).json(data);
          break;
        case "AUTH_ERR":
          res.status(401).json(data);
          break;
        default:
          res.status(500).json(data);
          break;
      }
      return;
    }

    res.status(200).json(data);
  } catch (error) {
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
};

export { authorizeController };
