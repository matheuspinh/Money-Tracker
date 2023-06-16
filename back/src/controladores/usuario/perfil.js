const perfil = async (req, res) => {
    try {
        return res.json(req.usuario);
    } catch (err) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = { perfil }