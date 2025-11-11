const express = require('express');
const professoresRouter = require('./src/routes/professoresRoutes');

const app = express();
const PORT = 3000;

// Middleware para processar JSON no corpo das requisições (POST, PUT)
app.use(express.json());

// Rota principal para a URL "/professores" [cite: 45]
app.use('/professores', professoresRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});