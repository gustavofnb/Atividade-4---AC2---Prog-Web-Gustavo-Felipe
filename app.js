const express = require('express');
const usuarioRouter = require('./routes/usuario');


const app = express();
const port = 3000;
app.use(express.json());

app.use('/usuario', usuarioRouter);

app.get('/ola/:nome', (req, res) => {
    res.json({ 'message': 'Olá, ' + req.params.nome + '!' });
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});