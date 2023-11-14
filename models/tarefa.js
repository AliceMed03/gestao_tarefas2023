const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Tarefa = sequelize.define('Tarefa', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_criacao: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data_limite: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {

});

module.exports = Tarefa

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true