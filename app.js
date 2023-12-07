// Importando as bibliotecas necessárias
var express = require('express');
const cors = require("cors");
const bodyparser = require('body-parser');
const PORT = "8081"

// Inicializando o aplicativo Express
var app = express();

// Habilitando o CORS para permitir requisições de diferentes origens
app.use(cors());

// Configurando o middleware para analisar solicitações JSON
app.use(bodyparser.json());

// Configurando o middleware para analisar solicitações com dados codificados na URL
app.use(bodyparser.urlencoded({ extended: true }));

// Importando os modelos de dados necessários
const Tarefa = require('./models/tarefa');
const Usuario = require('./models/usuario');

// Importando roteadores para as entidades "usuario" e "tarefa"
var usuarioRouter = require('./routes/routes_usuario');
var tarefaRouter = require('./routes/routes_tarefa');

// Definindo as rotas para os roteadores importados
app.use('/usuario', usuarioRouter);
app.use('/tarefa', tarefaRouter);

// Iniciando o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Exportando o aplicativo Express para ser utilizado em outros módulos
module.exports = app;
