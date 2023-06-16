const knex = require('../../conexoes/bancodedados')


const atualizar = async (req, res) => {
    const { id, descricao, vencimento, valor, pago } = req.body;

    try {
        const charge = await knex('cobrancas').where({ id })

        if (charge.length === 0) {
            return res.status(404).json({ mensagem: 'Cobrança não encontrada' })
        }

        await knex('cobrancas').update({ descricao, vencimento, valor, pago }).where({ id })

        return res.json({ mensagem: 'Cobrança atualizada com sucesso' })
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = { atualizar }