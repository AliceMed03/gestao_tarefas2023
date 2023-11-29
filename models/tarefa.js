const db = require('../sequelize.js');
const Sequelize = require('sequelize');

const Tarefa = db.define('tarefas', {
  // Model attributes are defined here
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  data_criacao: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  data_limite: {
    type: Sequelize.DATE,
    allowNull: false,
  }
}, {

});

Tarefa.sync();

module.exports = Tarefa;

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true