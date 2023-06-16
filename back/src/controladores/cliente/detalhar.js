const knex = require('../../conexoes/bancodedados')

const detalhar = async (req, res) => {
    const { id } = req.params

    if (isNaN(Number(id))) {
        return res.status(400).json({ mensagem: 'O parâmetro precisa ser um número' })
    }

    try {
        const dadosID = await knex('clientes').where({ id })

        if (dadosID.length === 0) {
            return res.status(400).json({ mensagem: 'Cliente não encontrado' })
        }

        return res.status(201).json(dadosID[0])

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = {
    detalhar
}