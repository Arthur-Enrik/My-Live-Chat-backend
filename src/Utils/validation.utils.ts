import { z } from "zod";

const registerBodyValidation = z.object({
	username: z
		.string({ required_error: "O username e obrigatorio!" })
		.min(4, { message: "O tamanho minimo do nome de usuário e 4 caracteres" }),
	email: z
		.string({ required_error: "O email e obrigatorio!" })
		.email({ message: "Formato do email é invalido" }),
	password: z
		.string({ required_error: "A senha e obrigatoria!" })
		.min(8, { message: "A senha deve ter no minimo 8 caracteres" }),
});

const loginBodyValidation = z.object({
	email: z
		.string({ required_error: "O email e obrigatorio!" })
		.email({ message: "Formato do email é invalido" }),
	password: z
		.string({ required_error: "A senha e obrigatoria!" })
		.min(8, { message: "A senha deve ter no minimo 8 caracteres" }),
});

export { registerBodyValidation, loginBodyValidation };
