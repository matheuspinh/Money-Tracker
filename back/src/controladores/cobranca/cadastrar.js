const knex = require('../../conexoes/bancodedados')

const cadastrar = async (req, res) => {
    const { cliente_id, descricao, vencimento, valor, pago } = req.body;

    try {
        const cliente = await knex('clientes').where({ id: cliente_id })

        if (cliente.length === 0) {
            return res.status(400).json({ mensagem: 'Cliente não encontrado' })
        }

        await knex('cobrancas').insert({ cliente_id, descricao, vencimento, valor, pago })

        return res.status(201).json({ mensagem: 'Cobrança cadastrada com sucesso' })
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = { cadastrar }