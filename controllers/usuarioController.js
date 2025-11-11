const usuarios = [];

exports.obterTodos = (req, res) => {
    res.json(usuarios);
};
exports.obterPorId = (req, res) => {
    const id = req.params.id;
    const usuario = usuarios.find(u => u.id === parseInt(id));
    if (!usuario) {
        return res.status(404).json(
            { 'message': 'Usuário não encontrado' }
        );
    }
    res.json(usuario);
};
exports.inserir = (req, res) => {
    usuarios.push(req.body);
    res.json({ 'message': "Salvo com sucesso" });
};
exports.excluir = (req, res) => {
    const id = req.params.id;
    const index = usuarios.findIndex(u => u.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json(
            { 'message': 'Usuário não encontrado' }
        );
    }
    usuarios.splice(index, 1);
    res.json({ 'message': 'Usuário excluído com sucesso' });
};
exports.atualizar = (req, res) => {
    const id = req.params.id;
    const index = usuarios.findIndex(u => u.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json(
            { 'message': 'Usuário não encontrado' }
        );
    }
    usuarios[index] = req.body;
    res.json({ 'message': 'Usuário atualizado com sucesso' });
};