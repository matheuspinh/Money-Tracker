const knex = require('../../conexoes/bancodedados')

const cadastrar = async (req, res) => {
    const { nome, email, cpf, telefone, endereco, complemento, cep, bairro, cidade, uf } = req.body

    try {
        const verificarDuplicidade = await knex('clientes').where({ email }).orWhere({ cpf }).orWhere({ telefone })

        if (verificarDuplicidade.length > 0) {
            return res.status(400).json({ mensagem: 'Email, cpf ou telefone já registrado' })
        }

        if (cpf.length !== 11 || isNaN(Number(cpf))) {
            return res.status(400).json({ mensagem: 'CPF inválido' })
        }

        if (telefone.length !== 11 || isNaN(Number(telefone))) {
            return res.status(400).json({ mensagem: 'Telefone inválido' })
        }

        const clienteFeito = await knex('clientes')
            .insert({
                nome,
                email,
                cpf,
                telefone,
                endereco,
                complemento,
                cep,
                bairro,
                cidade,
                uf
            }).returning('*')

        return res.status(201).json(clienteFeito[0])

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = {
    cadastrar
} 
