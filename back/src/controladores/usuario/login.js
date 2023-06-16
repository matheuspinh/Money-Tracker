const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('../../conexoes/bancodedados');

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const user = await knex('usuarios').where({ email })

        if (user.length === 0) {
            return res.status(400).json({ mensagem: 'E-mail ou senha inválidos.' });
        }

        const { senha: senhaDoUsuario, ...usuarioLogado } = user[0];

        const senhaValida = await bcrypt.compare(senha, senhaDoUsuario);

        if (!senhaValida) {
            return res.status(400).json({ mensagem: 'E-mail ou senha inválidos.' })
        }

        const token = jwt.sign({ id: usuarioLogado.id }, process.env.JWT_PASSWORD, { expiresIn: '24h' });

        return res.json({
            user: usuarioLogado,
            token
        });

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = { login }