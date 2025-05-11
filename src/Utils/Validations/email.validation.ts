import { z } from "zod";

const EmailValidation = z
  .string({ message: "Formato de email invalido" })
  .email({ message: "Email invalido" });

export { EmailValidation };
