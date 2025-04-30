import Joi from 'joi'

const userValidation = Joi.object({
    username: Joi.string().min(3).messages({
        'string.base': 'O parâmetro username deve ser uma string.',
        'string.empty': 'O nome de usuário é inválido.',
        'string.min': 'O nome deve ter no mínimo {#limit} caracteres.',
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'O parâmetro email deve ser uma string.',
        'string.empty': 'O parâmetro email é obrigatório.',
        'any.required': 'O email é obrigatório.',
        'string.email': 'Insira um email válido.'
    }),
    password: Joi.string().min(8).required().messages({
        'string.base': 'A senha deve ser um texto.',
        'string.empty': 'A senha é obrigatória.',
        'string.min': 'Senha muito curta, a senha deve ter no mínimo {#limit} caracteres.',
        'any.required': 'A senha é um campo obrigatório.'
    })
});

export { userValidation }