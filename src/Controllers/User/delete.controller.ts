import { Request, Response } from "express";
import { UserServices } from "../../Services/User/user.service.js";

import { Response as ResponseUtils } from "../../Utils/services-response.utils.js";

const deleteController = async (req: Request, res: Response): Promise<void> => {
  if (!req.user?._id) {
    res
      .status(500)
      .json(
        ResponseUtils.error(
          "Ocorreu um erro no servidor, Tente novamente mais tarde",
          "SERVER_ERR"
        )
      );
    return;
  }
  try {
    const data = await UserServices.delete(req.user._id);

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
    return;
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

export { deleteController };
