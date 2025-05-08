import { Request, Response } from "express";

//Services
import { UserServices } from "../../Services/User/user.service.js";
import { registerBodyValidation } from "../../Utils/validation.utils.js";
import { zodErrorHandler } from "../../Utils/zod-error-handler.utils.js";

//Interfaces
import { ZodError } from "zod";
import { IUserRegisterRequest } from "../../Interface/IUser.interface.js";

const registerController = async (
  req: Request<{}, {}, IUserRegisterRequest>,
  res: Response
): Promise<void> => {
  try {
    registerBodyValidation.parse(req.body);

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
      res.sendStatus(500);
    }
  }
};

export { registerController };
