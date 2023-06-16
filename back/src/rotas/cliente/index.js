const express = require('express')

const { verificarRequisicao } = require('../../intermediarios/verificarRequisicao')

const { cadastrar } = require('../../controladores/cliente/cadastrar')
const { listar } = require('../../controladores/cliente/listar')
const { atualizar } = require('../../controladores/cliente/atualizar')
const { detalhar } = require('../../controladores/cliente/detalhar')

const { atualizarCliente } = require('../../esquemas/cliente/atualizarCliente')
const { cadastrarCliente } = require('../../esquemas/cliente/cadastrarCliente')

const rotaCliente = express()

rotaCliente.post('/cliente', verificarRequisicao(cadastrarCliente), cadastrar)
rotaCliente.get('/cliente', listar)
rotaCliente.put('/cliente', verificarRequisicao(atualizarCliente), atualizar)
rotaCliente.get('/cliente/:id', detalhar)


module.exports = rotaCliente;