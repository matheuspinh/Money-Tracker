const knex = require('../../conexoes/bancodedados')

const email = async (req, res) => {
    const { email } = req.params

    try {
        const resultado = await knex('usuarios').where({ email }).returning('*')

        if (resultado.length > 0) {
            return res.status(409).json({ mensagem: 'Email já cadastrado' })
        }

        return res.send()
    } catch (error) {
        return res.status(500)
    }
}

module.exports = { email }