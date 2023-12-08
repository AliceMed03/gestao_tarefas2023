// Importando o Express e o Sequelize para interação com o banco de dados
const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Importando a instância do Sequelize configurada
const Tarefa = require('../models/tarefa'); // Importando o modelo de dados de tarefa

// Sincronizando o modelo com o banco de dados
sequelize.sync();

// Rota POST para criar uma nova tarefa
router.post('/', async (req, res) => {
    try {
        // Construindo a consulta SQL para inserção de uma nova tarefa
        const query = `INSERT INTO tarefas (titulo, descricao, status, data_criacao, data_limite) VALUES (?, ?, ?, ?, ?)`;
        const replacements = [req.body.titulo, req.body.descricao, req.body.status, new Date(), new Date()];

        // Executando a consulta e obtendo os resultados
        const [results, metadata] = await sequelize.query(query, { replacements });

        // Retornando uma resposta de sucesso
        res.status(201).json({
            success: true,
            message: "Tarefa criada com sucesso",
            results: results,
        });
    } catch (error) {
        // Retornando uma resposta de erro em caso de falha
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Rota GET para listar todas as tarefas
router.get('/', async (req, res) => {
    try {
        // Construindo a consulta SQL para selecionar todas as tarefas
        const query = "SELECT * FROM tarefas";
        const results = await sequelize.query(query, { type: QueryTypes.SELECT });

        // Retornando os resultados obtidos
        res.json({
            success: true,
            tarefas: results,
        });
    } catch (error) {
        // Retornando uma resposta de erro em caso de falha
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Rota GET para listar todas as tarefas, mas com filtro
router.get('/filtro/:palavra', async (req, res) => {
    try {
        // Construindo a consulta SQL para selecionar todas as tarefas
        const palavra = req.query.palavra;
        const query = (`SELECT * FROM tarefas where titulo LIKE '%${palavra}%'`);
        const results = await sequelize.query(query, { type: QueryTypes.SELECT });

        // Retornando os resultados obtidos
        res.json({
            success: true,
            tarefas: results,
        });
    } catch (error) {
        // Retornando uma resposta de erro em caso de falha
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Rota PUT para atualizar uma tarefa pelo ID
router.put('/:id', async(req, res) => {
    const id = req.params.id; // Obtendo o ID enviado pela requisição
    const { status } = req.body; // Obtendo o campo a ser alterado

    try {
        // Executando a consulta SQL para atualizar o status da tarefa
        await sequelize.query("UPDATE tarefas SET status = ? WHERE id = ?", { replacements: [status, id], type: QueryTypes.UPDATE });

        // Retornando uma resposta de sucesso
        res.status(200).json({ message: 'Status atualizado com sucesso.' });
    } catch (error) {
        // Retornando uma resposta de erro em caso de falha
        res.status(400).json({ msg: error.message });
    }
});

// Rota DELETE para excluir uma tarefa pelo ID
router.delete('/:id', async(req, res) => {
    const { id } = req.params; // Obtendo o ID enviado pela requisição para exclusão

    try {
        // Executando a consulta SQL para excluir a tarefa
        await sequelize.query("DELETE FROM tarefas WHERE id = ?", { replacements: [id], type: QueryTypes.DELETE });

        // Retornando uma resposta de sucesso
        res.status(200).json({ message: 'Tarefa deletada com sucesso.' });
    } catch (error) {
        // Retornando uma resposta de erro em caso de falha
        res.status(400).json({ msg: error.message });
    }
});

// Exportando o roteador para ser utilizado no aplicativo principal
module.exports = router;