const joi = require('joi')

const cadastrarCobranca = joi.object({
    cliente_id: joi.number().integer().positive().required().messages({
        'any.required': 'O campo cliente_id é obrigatório',
        'number.empty': 'O campo cliente_id é obrigatório',
        'number.base': 'O campo cliente_id precisa ser um number'
    }),
    descricao: joi.string().required().messages({
        'any.required': 'O campo descricao é obrigatório',
        'string.empty': 'O campo descricao é obrigatório',
        'string.base': 'O campo descricao precisa ser uma string'
    }),
    vencimento: joi.date().required().messages({
        'date.base': 'O campo vencimento precisa ter um formato válido',
        'any.required': 'O campo vencimento é obrigatório',
        'date.empty': 'O campo vencimento é obrigatório',
    }),
    valor: joi.number().integer().positive().required().messages({
        'any.required': 'O campo valor é obrigatório',
        'number.empty': 'O campo valor é obrigatório',
        'number.base': 'O campo valor precisa ser um number'
    }),
    pago: joi.boolean().required().messages({
        'any.required': 'O campo pago é obrigatório',
        'boolean.empty': 'O campo pago é obrigatório',
        'boolean.base': 'O campo pago precisa ser uma boolean'
    })
})

module.exports = { cadastrarCobranca }