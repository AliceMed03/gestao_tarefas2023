// Importando a instância do Sequelize configurada
const db = require('../sequelize.js');
const Sequelize = require('sequelize');

// Definindo o modelo de dados para a entidade "Usuario"
const Usuario = db.define('usuarios', {
  // Atributos do modelo são definidos aqui
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {

});

// Sincronizando o modelo com o banco de dados
Usuario.sync();

// Exportando o modelo para ser utilizado em outros módulos
module.exports = Usuario;

// `sequelize.define` também retorna o modelo
//console.log(User === sequelize.models.User); // true
