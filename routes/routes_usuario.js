// Importando o Express e o Sequelize para interação com o banco de dados
const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Importando a instância do Sequelize configurada
const Usuario = require('../models/usuario'); // Importando o modelo de dados de usuário

// Sincronizando o modelo com o banco de dados
sequelize.sync();

// Rota POST para criar um novo usuário
router.post('/', async (req, res) => {
    try {
        // Construindo a consulta SQL para inserção de um novo usuário
        const query = `INSERT INTO usuarios (username, email, senha) VALUES (?, ?, ?)`;
        const replacements = [req.body.username, req.body.email, req.body.senha];

        // Executando a consulta e obtendo os resultados
        const [results, metadata] = await sequelize.query(query, { replacements });

        // Retornando uma resposta de sucesso
        res.status(201).json({
            success: true,
            message: "Usuário criado com sucesso",
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

// Rota GET para listar todos os usuários
router.get('/', async (req, res) => {
    try {
        // Construindo a consulta SQL para selecionar todos os usuários
        const query = "SELECT * FROM usuarios";
        const results = await sequelize.query(query, { type: QueryTypes.SELECT });

        // Retornando os resultados obtidos
        res.json({
            success: true,
            usuarios: results,
        });
    } catch (error) {
        // Retornando uma resposta de erro em caso de falha
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Rota PUT para atualizar um usuário pelo ID
router.put('/:id', async(req, res) => {
    const id = req.params.id; // Obtendo o ID enviado pela requisição
    const { username } = req.body; // Obtendo o campo a ser alterado

    try {
        // Executando a consulta SQL para atualizar o usuário
        await sequelize.query("UPDATE usuarios SET username = ? WHERE id = ?", { replacements: [username, id], type: QueryTypes.UPDATE });

        // Retornando uma resposta de sucesso
        res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
    } catch (error) {
        // Retornando uma resposta de erro em caso de falha
        res.status(400).json({ msg: error.message });
    }
});

// Rota DELETE para excluir um usuário pelo ID
router.delete('/:id', async(req, res) => {
    const { id } = req.params; // Obtendo o ID enviado pela requisição para exclusão

    try {
        // Executando a consulta SQL para excluir o usuário
        await sequelize.query("DELETE FROM usuarios WHERE id = ?", { replacements: [id], type: QueryTypes.DELETE });

        // Retornando uma resposta de sucesso
        res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
        // Retornando uma resposta de erro em caso de falha
        res.status(400).json({ msg: error.message });
    }
});

// Exportando o roteador para ser utilizado no aplicativo principal
module.exports = router;
