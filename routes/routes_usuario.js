const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const sequelize = require('../sequelize');

//GET Retorna usuarios com paginação e ordenação
router.get('/usuario', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  sequelize.query(`SELECT * FROM usuario ORDER BY updatedAt DESC LIMIT ? OFFSET ?`,
      { replacements: [parseInt(limit), (page - 1) * parseInt(limit)] }
  )
  .then(([results, metadata]) => {
      res.json(results);
  }).catch((error) => {
      res.status(500).json({
          success: false,
          message: error.message,
      });
  });
});

//GET Consulta um usuario pelo ID
router.get('/usuario/:id', async (req, res) => {
  sequelize.query(`SELECT * FROM usuario WHERE id = ?`, { replacements: [req.params.id] })
  .then(([results, metadata]) => {
      if (results.length === 0) {
          res.status(404).json({
              success: false,
              message: "usuario não encontrada",
          });
      } else {
          res.json({
              success: true,
              task: results[0],
          });
      }
  }).catch((error) => {
      res.status(500).json({
          success: false,
          message: error.message,
      });
  });
});

//POST Cria uma tarefa
router.post('/usuario', async (req, res) => {
  sequelize.query(`INSERT INTO tarefas (username, email, senha) 
                  VALUES (?, ?, ?)`,
      { replacements: [req.body.username, req.body.email, req.body.senha] }
  )
  .then(([results, metadata]) => {
      res.status(201).json({
          success: true,
          message: "Tarefa criada com sucesso",
      });
  }).catch((error) => {
      res.status(500).json({
          success: false,
          message: error.message,
      });
  });
});

//PUT Atualiza uma tarefa pelo ID
router.put('/tarefa/:id', async (req, res) => {
  sequelize.query(`UPDATE tarefas SET description = ? WHERE id = ?`,
      { replacements: [req.body.description, req.params.id] }
  )
  .then(([results, metadata]) => {
      if (metadata.affectedRows === 0) {
          res.status(404).json({
              success: false,
              message: "tarefa não encontrada",
          });
      } else {
          res.json({
              success: true,
              message: "Tarefa atualizada com sucesso",
          });
      }
  }).catch((error) => {
      res.status(500).json({
          success: false,
          message: error.message,
      });
  });
});

//DELETE Deleta um usuario pelo ID
router.delete('/usuario/:id', async (req, res) => {
  sequelize.query(`DELETE FROM usuario WHERE id = ?`, { replacements: [req.params.id] })
  .then(([results, metadata]) => {
      if (metadata.affectedRows === 0) {
          res.status(404).json({
              success: false,
              message: "usuario não encontrado",
          });
      } else {
          res.json({
              success: true,
              message: "usuario deletado com sucesso",
          });
      }
  }).catch((error) => {
      res.status(500).json({
          success: false,
          message: error.message,
      });
  });
});

module.exports = Usuario;