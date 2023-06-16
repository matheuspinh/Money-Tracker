const express = require('express')

const { verificarRequisicao } = require('../../intermediarios/verificarRequisicao')

const { cadastrar } = require('../../controladores/usuario/cadastrar')
const { email } = require('../../controladores/usuario/email')
const { login } = require('../../controladores/usuario/login')
const { perfil } = require('../../controladores/usuario/perfil')
const { verificarLogin } = require('../../intermediarios/verificarLogin')
const { atualizar } = require('../../controladores/usuario/atualizar')

const { realizarLogin } = require('../../esquemas/usuario/realizarLogin')
const { cadastrarUsuario } = require('../../esquemas/usuario/cadastrarUsuario')
const { atualizarUsuario } = require('../../esquemas/usuario/atualizarUsuario')


const rotaUsuario = express()

rotaUsuario.get('/usuario/:email', email)
rotaUsuario.post('/usuario', verificarRequisicao(cadastrarUsuario), cadastrar)
rotaUsuario.post('/login', verificarRequisicao(realizarLogin), login)

rotaUsuario.use(verificarLogin)

rotaUsuario.get('/usuario', perfil)
rotaUsuario.put('/usuario', verificarRequisicao(atualizarUsuario), atualizar)

module.exports = rotaUsuario
