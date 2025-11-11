const express = require('express');
const router = express.Router();
const controller = require('../controllers/professorController');

// 1. Listar todos os professores (GET /professores) [cite: 46, 47, 48]
router.get('/', controller.listarProfessores);

// 2. Listar professores por departamento (GET /professores/departamento/:departamento) [cite: 70, 71, 72]
router.get('/departamento/:departamento', controller.listarPorDepartamento);

// 3. Buscar um professor por ID (GET /professores/:id) [cite: 50, 51, 52]
router.get('/:id', controller.buscarProfessorPorId);

// 4. Listar turmas de um professor (GET /professores/:id/turmas) [cite: 54, 55, 56]
router.get('/:id/turmas', controller.listarTurmasProfessor);

// 5. Atualizar dados de um professor (PUT /professores/:id) [cite: 61, 62, 63]
router.put('/:id', controller.atualizarProfessor);

// 6. Adicionar uma turma para um professor (POST /professores/:id/turmas) [cite: 66, 67, 68]
router.post('/:id/turmas', controller.adicionarTurma);

// 7. Remover um professor (DELETE /professores/:id) [cite: 74, 75, 76]
router.delete('/:id', controller.removerProfessor);

module.exports = router;