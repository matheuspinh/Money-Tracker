const knex = require('../../conexoes/bancodedados')


const listarPorId = async (req, res) => {
    const { id } = req.params

    if (isNaN(Number(id))) {
        return res.status(400).json({ mensagem: 'O parâmetro precisa ser um número' })
    }

    try {
        const cobranca = await knex('cobrancas').where({ id })

        if (cobranca.length === 0) {
            return res.status(404).json({ message: 'Cobrança não encontrada' })
        }

        return res.json(cobranca[0])
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = { listarPorId }