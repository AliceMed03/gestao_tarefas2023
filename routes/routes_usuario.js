const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Usuario = require('../models/usuario');

sequelize.sync()

//POST Cria um usuário
router.post('/', async (req, res) => {
    try {
        const query = `INSERT INTO usuarios (username, email, senha) VALUES (?, ?, ?)`;
        const replacements = [req.body.username, req.body.email, req.body.senha];

        const [results, metadata] = await sequelize.query(query, { replacements });

        res.status(201).json({
            success: true,
            message: "Usuário criado com sucesso",
            results: results,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// GET para listar todos os usuários
router.get('/', async (req, res) => {
    try {
        const query = "SELECT * FROM usuarios";
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

//PUT Atualiza um usuário pelo ID
router.put('/:id', async(req, res) => {
    const id = req.params.id; //pega o id enviado pela requisição
    const { username } = req.body; //campo a ser alterado
    try{
        await sequelize.query("UPDATE usuarios SET username = ? WHERE id = ?", { replacements: [username, id], type: QueryTypes.UPDATE });
        res.status(200).json({ message: 'Usuário atualizado com sucesso.' }); //statusCode indica ok no update
    }catch(error){
        res.status(400).json({msg:error.message}); //retorna status de erro e mensagens
    }
});

//DELETE Deleta um usuário pelo ID
router.delete('/:id', async(req, res) => {
    const {id} = req.params; //pega o id enviado pela requisição para ser excluído
    try{
        await sequelize.query("DELETE FROM usuarios WHERE id = ?", { replacements: [id], type: QueryTypes.DELETE });
        res.status(200).json({ message: 'Usuário deletado com sucesso.' }); //statusCode indica ok no delete
    }catch(error){
        res.status(400).json({msg:error.message}); //retorna status de erro e mensagens
    }
});

module.exports = router;