import { Request, Response, NextFunction } from "express";
import { IPayload } from "../Interface/IPayload.interface.js";

import { UserServices } from "../Services/User/user.service.js";
import { validateToken } from "../Utils/validate-token.utils.js";

declare global {
  namespace Express {
    interface Request {
      user?: IPayload;
    }
  }
}

const tokenValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get("authorization");
  if (!authHeader) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }
  const token = authHeader.split(" ")[1];
  const bearer = authHeader.split(" ")[0];
  if (!token) {
    res.status(401).json({ message: "Token invalido" });
    return;
  } else if (bearer.toLowerCase() !== "bearer") {
    res.status(401).json({ message: "Token invalido" });
    return;
  }
  try {
    const payload = validateToken(token) as IPayload;

    const data = await UserServices.findById(payload._id);

    if (!data.success) {
      res.status(401).json({ message: "Token invalido" });
      return;
    }
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalido" });
  }
};

export { tokenValidation };
