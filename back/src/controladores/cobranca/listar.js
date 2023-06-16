const knex = require('../../conexoes/bancodedados')


const listar = async (req, res) => {
    const { cliente_id } = req.query

    try {
        if (cliente_id && isNaN(Number(cliente_id))) {
            return res.status(400).json({ mensagem: 'O parâmetro precisa ser um número' })
        }

        if (cliente_id) {
            const cobrancasCliente = await knex('cobrancas').where({ cliente_id })
            return res.json(cobrancasCliente)
        }

        const cobrancas = await knex('cobrancas').leftJoin('clientes', { 'clientes.id': 'cobrancas.cliente_id' }).select('*', 'cobrancas.id as id')
        return res.json(cobrancas)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = { listar }