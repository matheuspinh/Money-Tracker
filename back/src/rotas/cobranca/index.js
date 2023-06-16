const express = require('express')

const { verificarRequisicao } = require('../../intermediarios/verificarRequisicao')

const { cadastrar } = require('../../controladores/cobranca/cadastrar')
const { atualizar } = require('../../controladores/cobranca/atualizar')
const { listar } = require('../../controladores/cobranca/listar')
const { listarPorId } = require('../../controladores/cobranca/listarPorId')
const { deletar } = require('../../controladores/cobranca/deletar')

const { cadastrarCobranca } = require('../../esquemas/cobranca/cadastrarCobranca')
const { atualizarCobranca } = require('../../esquemas/cobranca/atualizarCobranca')

const rotaCobranca = express()

rotaCobranca.post('/cobranca', verificarRequisicao(cadastrarCobranca), cadastrar)
rotaCobranca.put('/cobranca', verificarRequisicao(atualizarCobranca), atualizar)
rotaCobranca.get('/cobranca', listar)
rotaCobranca.get('/cobranca/:id', listarPorId)
rotaCobranca.delete('/cobranca/:id', deletar)


module.exports = rotaCobranca
