// Interfaces
import { Request, Response } from "express";
import { ZodError } from "zod";

// Utils
import { Response as ResponseUtils } from "../../Utils/services-response.utils.js";

// Services
import { UserServices } from "../../Services/User/user.service.js";

const getUserByEmail = async (req: Request, res: Response): Promise<void> => {
  if (!req.query.email) {
    res.sendStatus(400);
    return;
  }
  const email = req.query.email as string;

  try {
    const data = await UserServices.findByEmail(email);

    if (!data.success) {
      switch (data.err) {
        case "NOT_FOUND":
          res.status(404).json(data);
          break;
        default:
          res.status(500).json(data);
          break;
      }
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
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

export { getUserByEmail };
