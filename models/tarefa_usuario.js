// Importando os modelos de dados de Tarefa e Usuário
const Tarefa = require('./tarefa');
const Usuario = require('./usuario');

// Definindo a tabela de associação "tarefas_usuarios" usando o Sequelize
const tarefas_usuarios = sequelize.define('tarefas_usuarios', {}, { timestamps: false });

// Estabelecendo a relação de muitos para muitos entre Tarefa e Usuário através da tabela de associação
Tarefa.belongsToMany(Usuario, { through: tarefas_usuarios });
Usuario.belongsToMany(Tarefa, { through: tarefas_usuarios });
