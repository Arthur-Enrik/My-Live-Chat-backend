import { Types } from "../Interface/IError-types.interface.js";

class Response {
  static success(message: string, data?: Record<string, any>) {
    return {
      success: true,
      message,
      ...data,
    };
  }
  static error(message: string, err: Types, data?: Record<string, any>) {
    return {
      success: false,
      message,
      err,
      ...data,
    };
  }
}

export { Response };
