const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Tarefa = require('../models/tarefa');

sequelize.sync()

//POST Cria uma tarefa
router.post('/', async (req, res) => {
    try {
        const query = `INSERT INTO tarefas (titulo, descricao, status, data_criacao, data_limite) VALUES (?, ?, ?, ?, ?)`;
        const replacements = [req.body.titulo, req.body.descricao, req.body.status, new Date(), new Date()];

        const [results, metadata] = await sequelize.query(query, { replacements });

        res.status(201).json({
            success: true,
            message: "Tarefa criada com sucesso",
            results: results,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// GET para listar todas as tarefas
router.get('/', async (req, res) => {
    try {
        const query = "SELECT * FROM tarefas";
        const results = await sequelize.query(query, { type: QueryTypes.SELECT });

        res.json({
            success: true,
            tarefas: results,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

//PUT Atualiza uma tarefa pelo ID
router.put('/tarefa/:id', async(req, res) => {
    const id = req.params.id; //pega o id enviado pela requisição
    const { status } = req.body; //campo a ser alterado
    try{
        //altera o campo preco, no registro onde o id coincidir com o id enviado
        await sequelize.query("UPDATE tarefas SET status = ? WHERE id = ?", { replacements: [status, id], type: QueryTypes.UPDATE });
        res.status(200).json({ message: 'Status atualizado com sucesso.' }); //statusCode indica ok no update
    }catch(error){
        res.status(400).json({msg:error.message}); //retorna status de erro e mensagens
    }
});

//DELETE Deleta uma tarefa pelo ID
router.delete('/tarefa/:id', async(req, res) => {
    const {id} = req.params; //pega o id enviado pela requisição para ser excluído
    try{
        await sequelize.query("DELETE FROM tarefas WHERE id = ?", { replacements: [id], type: QueryTypes.DELETE });
        res.status(200).json({ message: 'Tarefa deletada com sucesso.' }); //statusCode indica ok no delete
    }catch(error){
        res.status(400).json({msg:error.message}); //retorna status de erro e mensagens
    }
});

module.exports = router;