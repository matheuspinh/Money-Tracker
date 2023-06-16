const knex = require('../../conexoes/bancodedados')


const listar = async (req, res) => {
    const lista = []
    try {
        const dados = await knex('clientes').leftJoin('cobrancas', { 'clientes.id': 'cobrancas.cliente_id' }).select('*', 'clientes.id as id', 'cobrancas.id as cobranca_id', 'clientes.nome as nome')

        dados.map((dado) => {
            const { id, nome, email, cpf, telefone, endereco, complemento, cep, bairro, cidade, uf } = dado

            let cliente = { id, nome, email, cpf, telefone, endereco, complemento, cep, bairro, cidade, uf }

            const dataAtual = new Date();
            dataAtual.setHours(0, 0, 0, 0)   

            if ((dado.id === dado.cliente_id) && (dado.pago === false) && (dataAtual > dado.vencimento)) {
                const clienteListado = lista.find(cliente => cliente.id === dado.id)
                if (clienteListado) {
                    return clienteListado.emDia = false
                }
                return lista.push({ ...cliente, emDia: false })
            }

            if (lista.find(clienteListado => clienteListado.id === dado.id)) return

            return lista.push({ ...cliente, emDia: true })
        })

        lista.sort((a, b) => a.id - b.id)

        return res.status(200).json(lista)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = {
    listar
}
