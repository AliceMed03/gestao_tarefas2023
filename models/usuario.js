const db = require('../sequelize.js');
const Sequelize = require('sequelize');

const Usuario = db.define('Usuario', {
  // Model attributes are defined here
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

Usuario.sync();

module.exports = Usuario

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true