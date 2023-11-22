const sequelize = require("../db"),
  Tarefa = require("./tarefa"),
  Usuario = require("./usuario");

Tarefa.belongsToMany(Usuario, {
  through: "UsuarioTarefa",
  foreignKey: "usuarios_id",
  otherKey: "tarefas_id",
  unique: true,
});

Usuario.belongsToMany(Tarefa, {
  through: "UsuarioTarefa",
  foreignKey: "tarefas_id",
  otherKey: "usuarios_id",
  unique: true,
});

module.exports = sequelize;