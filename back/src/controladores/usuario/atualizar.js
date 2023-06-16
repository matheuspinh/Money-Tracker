const knex = require('../../conexoes/bancodedados')
const bcrypt = require('bcrypt')

const atualizar = async (req, res) => {
    const { nome, email, senha, cpf, telefone } = req.body;
    const { id } = req.usuario;

    try {
        const verificarEmail = await knex('usuarios').where({ email }).whereNot({ id })
        const verificarCpf = await knex('usuarios').where({ cpf }).whereNot({ id })
        const verificarTelefone = await knex('usuarios').where({ telefone }).whereNot({ id })

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

        const user = await knex('usuarios').where({ id })

        const verificarSenha = await bcrypt.compare(senha, user[0].senha);

        if (verificarSenha) {
            await knex('usuarios').update({ nome, email, cpf, telefone }).where({ id })
            return res.status(201).json({ mensagem: 'Usuário atualizado com sucesso' })
        }

        const novaSenha = await bcrypt.hash(senha, 10);

        await knex('usuarios').update({ nome, email, senha: novaSenha, cpf, telefone }).where({ id })

        return res.status(201).json({ mensagem: 'Usuário atualizado com sucesso' })
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = { atualizar }