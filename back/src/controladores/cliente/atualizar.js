const knex = require('../../conexoes/bancodedados')

const atualizar = async (req, res) => {
    const { id, nome, email, cpf, telefone, endereco, complemento, cep, bairro, cidade, uf } = req.body

    try {
        const verificarEmail = await knex('clientes').where({ email }).whereNot({ id })
        const verificarCpf = await knex('clientes').where({ cpf }).whereNot({ id })
        const verificarTelefone = await knex('clientes').where({ telefone }).whereNot({ id })

        if (verificarEmail.length > 0) {
            return res.status(400).json({ mensagem: 'E-mail já cadastrado.' });
        }

        if (verificarCpf.length > 0) {
            return res.status(400).json({ mensagem: 'Cpf já cadastrado.' });
        }

        if (verificarTelefone.length > 0) {
            return res.status(400).json({ mensagem: 'Telefone já cadastrado.' });
        }

        if (cpf.length !== 11 || isNaN(Number(cpf))) {
            return res.status(400).json({ mensagem: 'CPF inválido' })
        }

        if (telefone.length !== 11 || isNaN(Number(telefone))) {
            return res.status(400).json({ mensagem: 'Telefone inválido' })
        }

        await knex('clientes')
            .where({ id })
            .update({
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
            })

        return res.status(201).json({ mensagem: 'Cliente atualizado com sucesso' })

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }

}

module.exports = {
    atualizar
}