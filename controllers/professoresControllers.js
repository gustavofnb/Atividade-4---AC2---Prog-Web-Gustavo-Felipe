const fs = require('fs');
const path = require('path');

// Caminho para o "Banco de Dados" (arquivo JSON)
const dataPath = path.join(__dirname, '..', 'professores.json');

// Função auxiliar para ler os dados
const lerProfessores = () => {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Erro ao ler dados:", error);
        return [];
    }
};

// Função auxiliar para escrever os dados
const escreverProfessores = (professores) => {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(professores, null, 2), 'utf8');
    } catch (error) {
        console.error("Erro ao escrever dados:", error);
    }
};

// 1. Listar todos os professores (GET /professores) [cite: 46, 49]
exports.listarProfessores = (req, res) => {
    const professores = lerProfessores();
    res.json(professores);
};

// 2. Buscar um professor por ID (GET /professores/:id) [cite: 50, 53]
exports.buscarProfessorPorId = (req, res) => {
    const { id } = req.params;
    const professores = lerProfessores();
    const professor = professores.find(p => p.id === id);

    if (professor) {
        res.json(professor);
    } else {
        res.status(404).json({ mensagem: 'Id não existente' });
    }
};

// 3. Listar turmas de um professor (GET /professores/:id/turmas) [cite: 54, 60]
exports.listarTurmasProfessor = (req, res) => {
    const { id } = req.params;
    const professores = lerProfessores();
    const professor = professores.find(p => p.id === id);

    if (professor) {
        res.json(professor.turmas);
    } else {
        res.status(404).json({ mensagem: 'Professor não encontrado' });
    }
};

// 4. Atualizar dados de um professor (PUT /professores/:id) [cite: 61, 64, 65]
exports.atualizarProfessor = (req, res) => {
    const { id } = req.params;
    const { nome, idade, departamento } = req.body;
    let professores = lerProfessores();
    const index = professores.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ mensagem: 'Id não existente' });
    }

    // Atualiza apenas os campos permitidos [cite: 64]
    professores[index].nome = nome || professores[index].nome;
    professores[index].idade = idade || professores[index].idade;
    professores[index].departamento = departamento || professores[index].departamento;

    escreverProfessores(professores);
    res.json(professores[index]);
};

// 5. Adicionar uma turma para um professor (POST /professores/:id/turmas) [cite: 66, 69]
exports.adicionarTurma = (req, res) => {
    const { id } = req.params;
    const novaTurma = req.body; // Espera { codigo, disciplina, alunos } [cite: 69]
    let professores = lerProfessores();
    const professor = professores.find(p => p.id === id);

    if (!professor) {
        return res.status(404).json({ mensagem: 'Id não existente' });
    }

    if (!professor.turmas) {
        professor.turmas = [];
    }

    professor.turmas.push(novaTurma);

    escreverProfessores(professores);
    res.status(201).json(professor); // 201 Created
};

// 6. Listar professores por departamento (GET /professores/departamento/:departamento) [cite: 70, 73]
exports.listarPorDepartamento = (req, res) => {
    const { departamento } = req.params;
    const professores = lerProfessores();

    // Filtra os professores pelo departamento (ignorando case)
    const filtrados = professores.filter(p => 
        p.departamento.toLowerCase() === departamento.toLowerCase()
    );

    if (filtrados.length > 0) {
        res.json(filtrados);
    } else {
        res.status(404).json({ mensagem: `Nenhum professor encontrado no departamento: ${departamento}` });
    }
};

// 7. Remover um professor (DELETE /professores/:id) [cite: 74, 77]
exports.removerProfessor = (req, res) => {
    const { id } = req.params;
    let professores = lerProfessores();
    const index = professores.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ mensagem: 'Id não existente' });
    }

    // Remove o professor do array
    const [professorRemovido] = professores.splice(index, 1);

    escreverProfessores(professores);
    // Retorna o professor que foi removido e status 200 (OK)
    res.json({ mensagem: `Professor ${professorRemovido.nome} removido com sucesso.` });
};