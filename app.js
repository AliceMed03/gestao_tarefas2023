var express = require('express');
const cors = require("cors");
const bodyparser = require('body-parser');
const PORT = "8081"

var app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const Tarefa = require('./models/tarefa');
const Usuario = require('./models/tarefa');

var usuarioRouter = require('./routes/routes_usuario');
var tarefaRouter = require('./routes/routes_tarefa');

app.use('/usuario', usuarioRouter);
app.use('/tarefa', tarefaRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
