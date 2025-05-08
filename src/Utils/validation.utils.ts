import { z } from "zod";

const registerBodyValidation = z.object({
  username: z
    .string({ message: "O nome de usuario não e uma string" })
    .min(4, { message: "O tamanho minimo do nome de usuário e 4 caracteres" }),
  email: z
    .string({ message: "O email não e uma string" })
    .email({ message: "Formato do email é invalido" }),
  password: z
    .string({ message: "A senha não e uma string" })
    .min(8, { message: "A senha deve ter no minimo 8 caracteres" }),
});

const loginBodyValidation = z.object({
  email: z
    .string({ message: "O email não e uma string" })
    .email({ message: "Formato do email é invalido" }),
  password: z
    .string({ message: "A senha não e uma string" })
    .min(8, { message: "A senha deve ter no minimo 8 caracteres" }),
});

export { registerBodyValidation, loginBodyValidation };
