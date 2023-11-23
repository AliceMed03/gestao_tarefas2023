const Tarefa = require('./tarefa');
const Usuario = require('./usuario');

const tarefas_usuarios = sequelize.define('tarefas_usuarios', {}, { timestamps: false });
Tarefa.belongsToMany(Usuario, { through: tarefas_usuarios });
Usuario.belongsToMany(Tarefa, { through: tarefas_usuarios });