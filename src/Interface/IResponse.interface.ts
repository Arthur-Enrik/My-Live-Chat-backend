import { Types } from "./IError-types.interface.js";

interface Response {
  success: boolean;
  message: string;
  err?: Types;
  data?: Record<string, any>;
}

export { Response };
