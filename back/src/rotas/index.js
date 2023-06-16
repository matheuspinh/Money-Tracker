const express = require('express')

const rotaUsuario = require('./usuario')
const rotaCliente = require('./cliente')
const rotaCobranca = require('./cobranca')

const rotas = express()

rotas.use(rotaUsuario)
rotas.use(rotaCliente)
rotas.use(rotaCobranca)

module.exports = rotas
