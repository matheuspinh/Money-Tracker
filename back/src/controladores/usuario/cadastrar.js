const knex = require('../../conexoes/bancodedados')
const bcrypt = require('bcrypt')

const cadastrar = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const emailExistente = await knex('usuarios').where({ email })

        if (emailExistente.length > 0) {
            return res.status(400).json({ mensagem: 'E-mail já cadastrado' })
        }

        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = bcrypt.hashSync(senha, salt)

        await knex('usuarios')
            .insert({
                email,
                senha: hash,
                nome,
            })

        return res.status(201).json({ mensagem: 'Cadastro Feito' })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = { cadastrar }