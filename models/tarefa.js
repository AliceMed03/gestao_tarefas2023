// Importando a instância do Sequelize configurada
const db = require('../sequelize.js');
const Sequelize = require('sequelize');

// Definindo o modelo de dados para a entidade "Tarefa"
const Tarefa = db.define('tarefas', {
  // Atributos do modelo são definidos aqui
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

// Sincronizando o modelo com o banco de dados
Tarefa.sync();

// Exportando o modelo para ser utilizado em outros módulos
module.exports = Tarefa;

// `sequelize.define` também retorna o modelo
//console.log(User === sequelize.models.User); // true
