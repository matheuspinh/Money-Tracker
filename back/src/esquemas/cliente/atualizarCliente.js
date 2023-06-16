const joi = require('joi')

const atualizarCliente = joi.object({
    id: joi.number().required().messages({
        'any.required': 'O campo id é obrigatório',
        'number.empty': 'O campo id é obrigatório',
    }),
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'O campo nome é obrigatório',
        'string.base': 'O campo nome precisa ser uma string'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O campo email é obrigatório',
        'string.email': 'E-mail inválido',
        'string.base': 'O campo email precisa ser uma string'
    }),
    cpf: joi.string().required().messages({
        'any.required': 'O campo cpf é obrigatório',
        'string.empty': 'O campo cpf é obrigatório',
        'string.base': 'O campo cpf precisa ser uma string'
    }),
    telefone: joi.string().required().messages({
        'any.required': 'O campo telefone é obrigatório',
        'string.empty': 'O campo telefone é obrigatório',
        'string.base': 'O campo telefone precisa ser uma string'
    }),
    endereco: joi.string().allow('', null),
    complemento: joi.string().allow('', null),
    cep: joi.string().allow('', null),
    bairro: joi.string().allow('', null),
    cidade: joi.string().allow('', null),
    uf: joi.string().allow('', null)
})

module.exports = { atualizarCliente }