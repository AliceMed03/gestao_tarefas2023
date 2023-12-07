// Importando o Sequelize para interagir com o banco de dados
const { Sequelize } = require('sequelize');

// Importando a biblioteca dotenv para lidar com variáveis de ambiente
const dotenv = require('dotenv');
dotenv.config(); // Carregando as configurações do arquivo .env

// Criando a instância do Sequelize e configurando com as informações do banco de dados
const db = new Sequelize(
    process.env.DB_NAME,     // Nome do banco de dados
    process.env.DB_USER,     // Nome do usuário do banco de dados
    process.env.DB_PASSWORD, // Senha do usuário do banco de dados
    {
        host: process.env.DB_HOST, // Endereço do servidor do banco de dados
        dialect: 'mysql'           // Dialeto do banco de dados (neste caso, MySQL)
    });

// Exportando a instância do Sequelize configurada para ser utilizada em outros módulos
module.exports = db;
