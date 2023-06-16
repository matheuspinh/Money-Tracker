const joi = require('joi')

const cadastrarCliente = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'O campo nome é obrigatório',
        'string.base': 'O campo nome precisa ser uma string'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O campo email é obrigatório',
        'string.email': 'O campo email precisa ter um email válido',
        'string.base': 'O campo email precisa ser uma string'
    }),
    cpf: joi.string().required().messages({
        'any.required': 'O campo cpf é obrigatório',
        'string.empty': 'O campo cpf é obrigatório',
        'string.base': 'O campo cpf precisa ser uma string',
    }),
    telefone: joi.string().required().messages({
        'any.required': 'O campo telefone é obrigatório',
        'string.empty': 'O campo telefone é obrigatório'
    }),
    cep: joi.string().allow('', null),
    endereco: joi.string().allow('', null),
    complemento: joi.string().allow('', null),
    bairro: joi.string().allow('', null),
    cidade: joi.string().allow('', null),
    uf: joi.string().allow('', null)
})

module.exports = {
    cadastrarCliente
}