const joi = require('joi')

const realizarLogin = joi.object({
    email: joi.string().required().messages({
        'any.required': 'O campo e-mail é obrigatório',
        'string.empty': 'O campo e-mail é obrigatório',
        'string.email': 'E-mail inválido',
        'string.base': 'O campo e-mail precisa ser uma string'
    }),
    senha: joi.string().required().messages({
        'any.required': 'O campo senha é obrigatório',
        'string.empty': 'O campo senha é obrigatório',
        'string.base': 'O campo senha precisa ser uma string'
    })
})

module.exports = { realizarLogin }