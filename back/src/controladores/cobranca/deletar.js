const knex = require('../../conexoes/bancodedados')


const deletar = async (req, res) => {
    const { id } = req.params
        
    try {
        if (isNaN(Number(id))) {
            return res.status(400).json({ mensagem: 'O parâmetro precisa ser um número' })
        }

        const verificarCobranca = await knex('cobrancas').where('id', id).returning('*')
        
        if (verificarCobranca.length === 0) {
            return res.status(404).json({mensagem: 'Essa cobrança não foi encontrada no nosso sistema'})
        }

        const {vencimento, pago} = verificarCobranca[0]

        if (pago) {
            return res.status(403).json({mensagem: 'você não pode deletar uma cobrança paga'})
        }

        const dataAtual = new Date();
        dataAtual.setHours(0, 0, 0, 0)        

        if (vencimento < dataAtual) {
            return res.status(403).json({mensagem: 'você não pode deletar uma cobrança que já venceu'})
        }

        await knex('cobrancas').where('id', id).del()

        return res.status(204).json()

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = { deletar }